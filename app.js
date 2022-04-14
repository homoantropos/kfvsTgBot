const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const passport = require('passport');

const sequelize = require('./database/sequelize');

const bot = require('./bot');

const userRoutes = require('./routes/user_routes');
const subscriberRoutes = require('./routes/subscriber_routes');
const occasionRoutes = require('./routes/occasion_routes');
const Subscriber = require("./models/Subscriber");

bot.listen();

app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(require('morgan')('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(require('cors')());

app.use('/api/user', userRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/occasions', occasionRoutes);

sequelize.sync({alter: true})
    .then(
        () => console.log('DataBase connection established successfully.')
    ).catch(
    (err) => console.log(err)
)

app.use(express.Router().post('/api/send', passport.authenticate('jwt', {session: false}),
    async (req, res) => {
    try {
        const tgIds = JSON.parse(req.body.tgIds);
        console.log('tgIds: ', tgIds);
        if(tgIds.length > 0) {
            tgIds.map(
                async tgId => {
                    let subscriber = await Subscriber.scope('subs').findOne({
                        where: {tgId}
                    });
                    if (subscriber) {
                        await bot.bot.telegram[req.body.method](subscriber.tgId, req.body?.text, {parse_mode: 'HTML'}, req?.file);
                    }
                }
            );
        } else {
            const subscribers = await Subscriber.scope('subs').findAll();
            subscribers.map(
                subscriber => bot.bot.telegram[req.body.method](subscriber.tgId, req.body.text, {parse_mode: 'HTML'})
            )
        }
        res.status(200).json({
            message: 'Повідомлення успішно відправлено'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message ? error.message : error
        })
    }
}));

module.exports = app
