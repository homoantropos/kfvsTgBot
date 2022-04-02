const express = require('express');
const app = express();
const bot = require('./bot');
const bodyParser = require("body-parser");
const passport = require('passport');

const sequelize = require('./database/sequelize');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());

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
