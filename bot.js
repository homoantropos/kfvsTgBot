const {Telegraf} = require('telegraf');
const keys = require('./config/keys');
const keyboards = require('./keyboards/keyboard');
const views = require('./views/views');

const bot = new Telegraf(keys.token);

bot.start(ctx => {
    const {from: {first_name}} = ctx.update.message;
    ctx.reply(`Привіт, ${first_name}! Для продовження обери, що тебе цікавить:`, {
        reply_markup: {
            keyboard: keyboards.start
        }
    });
});

bot.hears('Фізична культура', ctx => {
    ctx.reply(`Вітаємо на сторінці фізичної культури`, {
        reply_markup: {
            keyboard: keyboards.physical_culture
        }
    });
});

bot.hears('Спорт', ctx => {
    ctx.reply(`Функція в розробці`);
});

bot.hears('Семінари', ctx => {
    ctx.reply('для повернення до меню натисніть "Назад"', {
        reply_markup: {
            remove_keyboard: true
        },
    });
    ctx.reply('Модельна навчальна програма «Фізична культура. 5-6 класи»', {
        reply_markup: {
            inline_keyboard: keyboards.seminars
        },
    });
});

bot.hears('Контакти', ctx => {
    ctx.reply(views.contacts, {parse_mode: 'HTML'});
});

bot.hears('Заняття вдома', ctx => {
    ctx.reply('для повернення до меню натисніть "Назад"', {
        reply_markup: {
            remove_keyboard: true
        },
    });
    ctx.reply(`Фізична культура он-лайн`, {
        reply_markup: {
            inline_keyboard: keyboards.home
        },
    });
});

bot.hears('Уроки', ctx => {
    ctx.reply('для повернення до меню натисніть "Назад"', {
        reply_markup: {
            remove_keyboard: true
        },
    });
    ctx.reply('Модельна навчальна програма «Фізична культура. 5-6 класи»', {
        reply_markup: {
            inline_keyboard: keyboards.lessons
        },
    });
});

bot.hears('Cool Games', ctx => {
    ctx.reply('для повернення до меню натисніть "Назад"', {
        reply_markup: {
            remove_keyboard: true
        },
    });
    ctx.reply(`Все про Cool Games`, {
        reply_markup: {
            inline_keyboard: keyboards.cool_games
        },
    });
});

bot.hears('Cool Race', ctx => {
    ctx.reply(`Функція в розробці`);
});

bot.hears('Заняття на природі', ctx => {
    ctx.reply(`Функція в розробці`);
});

bot.hears('Турніки', ctx => {
    ctx.reply(`Функція в розробці`);
});

bot.hears('Завершити роботу', ctx => {
    ctx.reply(`Дякуємо, що завітали!`, {
        reply_markup: {
            remove_keyboard: true
        }
    });
});

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
