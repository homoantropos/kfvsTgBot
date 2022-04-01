const express = require('express');
const app = express();
const bot = require('./bot');

bot.launch();

module.exports = app
