const {Telegraf} = require('telegraf');
const keys = require('./config/keys');
const keyboards = require('./keyboards/keyboard');

const bot = new Telegraf(keys.token);

bot.start(ctx => {
    const {from: {first_name}} = ctx.update.message;
    const {chat: {id}} = ctx.update.message;
    ctx.telegram.sendMessage(id, `Привіт, ${first_name}! Для продовження обери, що тебе цікавить:`, {
        reply_markup: {
            keyboard: keyboards.start
        }
    });
})

bot.hears('Фізична культура', ctx => {
    const {chat: {id}} = ctx.update.message;
    ctx.telegram.sendMessage(id, `Вітаємо на сторінці фізичної культури`, {
        reply_markup: {
            keyboard: keyboards.physical_culture
        }
    });
});

bot.hears('Завершити роботу', ctx => {
    const {chat: {id}} = ctx.update.message;
    ctx.telegram.sendMessage(id, `Дякуємо, що завітали!`, {
        reply_markup: {
            remove_keyboard: true
        }
    });
});

module.exports = bot
