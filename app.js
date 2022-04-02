const express = require('express');
const app = express();
const bot = require('./bot');
const bodyParser = require("body-parser");
const passport = require('passport');

const sequelize = require('./database/sequelize');

const userRoutes = require('./routes/user_routes');

app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(require('cors')());

app.use('/api/user', userRoutes);

bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

sequelize.sync({alter: true})
    .then(
        () => console.log('DataBase connection established successfully.')
    ).catch(
    (err)=> console.log(err)
)

module.exports = app
