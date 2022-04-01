const express = require('express');
const app = express();
const bot = require('./bot');
const bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());

bot.launch();

module.exports = app
