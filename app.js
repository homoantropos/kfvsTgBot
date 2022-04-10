const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const passport = require('passport');

const sequelize = require('./database/sequelize');

const bot = require('./bot');

const userRoutes = require('./routes/user_routes');
const subscriberRoutes = require('./routes/subscriber_routes');
const occasionRoutes = require('./routes/occasion_routes');
const moment = require("moment");

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
app.use(moment.locale('uk-UK'));

app.use('/api/user', userRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/occasions', occasionRoutes);

sequelize.sync({alter: true})
    .then(
        () => console.log('DataBase connection established successfully.')
    ).catch(
    (err)=> console.log(err)
)

module.exports = app
