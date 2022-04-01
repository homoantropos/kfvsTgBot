const {Telegraf} = require('telegraf');
const keys = require('./config/keys');
const keyboards = require('./keyboards/keyboard');
const onMessage = require('./controllers/onMessage');

const bot = new Telegraf(keys.token);

bot.on('message', ctx => onMessage(ctx));

bot.on('callback_query', ctx => {
    const {callback_query: {data}} = ctx.update;
    switch (data) {
        case ('Фізична культура') :
            ctx.reply(`Вітаємо на сторінці фізичної культури`, {
                reply_markup: {
                    keyboard: keyboards.physical_culture
                }
            });
            break
        case ('/start') :
            ctx.reply(`Вітаємо на головній сторінці`, {
                reply_markup: {
                    keyboard: keyboards.start
                }
            });
            break
        case ('Функція в розробці') :
            ctx.answerCbQuery(data);
            break
    }
})

module.exports = bot
