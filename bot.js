const {Telegraf} = require('telegraf');
const keys = require('./config/keys');
const onMessage = require('./controllers/onMessage');
const onCallback = require('./controllers/onCallbackQuery');

const bot = new Telegraf(keys.token);

bot.on('message', ctx => onMessage(ctx));

bot.on('callback_query', ctx => onCallback(ctx));

module.exports = bot
