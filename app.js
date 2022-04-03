const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const passport = require('passport');

const sequelize = require('./database/sequelize');

const bot = require('./bot');

const userRoutes = require('./routes/user_routes');
const subscriberRoutes = require('./routes/subscriber_routes');

bot.listen();
bot.sendMessageToAllSubscribers('вітаємо! це повідомлення - перевірка працездатності масової розсилки.' +
    'Просимо не звертати на нього увагу і не відповідати')

app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(require('cors')());

app.use('/api/user', userRoutes);
app.use('/api/subscribers', subscriberRoutes);

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

sequelize.sync({alter: true})
    .then(
        () => console.log('DataBase connection established successfully.')
    ).catch(
    (err)=> console.log(err)
)

module.exports = app
