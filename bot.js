const Telegram = require('node-telegram-bot-api');
const keys = require('./config/keys');

const bot = new Telegram(keys.token, {polling: true});


module.exports = bot
