const inlineKBRDS = require('../keyboards/inlineKeyboards');
const keyboards = require("../keyboards/keyboard");
const views = require("../views/views");

module.exports = ctx => {
    const {message: {text}} = ctx.update
    switch (text) {

        case('/start') :
            const {from: {first_name}} = ctx.update.message;
            ctx.reply(
                `Привіт, ${first_name}! Для продовження обери, що тебе цікавить:`,
                {reply_markup: {keyboard: keyboards.start}});
            break;

        case('Фізична культура') :
            ctx.reply(
                `Вітаємо на сторінці фізичної культури`,
                {reply_markup: {keyboard: keyboards.physical_culture}});
            break;

        case('Спорт') :
            ctx.reply(`Функція в розробці`);
            break;

        case('Семінари') :
            ctx.reply(
                'для повернення до меню натисніть "Назад"',
                {reply_markup: {remove_keyboard: true},});
            ctx.reply(
                'Семінари з різних аспектів рухової активності:',
                {reply_markup: {inline_keyboard: inlineKBRDS.seminars}});
            break;

        case('Контакти') :
            ctx.reply(views.contacts, {parse_mode: 'HTML'});
            break;

        case('Заняття вдома') :
            ctx.reply(
                'для повернення до меню натисніть "Назад"',
                {reply_markup: {remove_keyboard: true}}
            );
            ctx.reply(`Фізична культура он-лайн`,
                {reply_markup: {inline_keyboard: inlineKBRDS.home}}
            );
            break;

        case('Уроки') :
            ctx.reply(
                'для повернення до меню натисніть "Назад"',
                {reply_markup: {remove_keyboard: true}}
            );
            ctx.reply(
                'Модельна навчальна програма «Фізична культура. 5-6 класи»',
                {reply_markup: {inline_keyboard: inlineKBRDS.lessons}}
            );
            break;

        case('Cool Games') :
            ctx.reply(
                'для повернення до меню натисніть "Назад"',
                {reply_markup: {remove_keyboard: true}}
            );
            ctx.reply(
                `Все про Cool Games`,
                {reply_markup: {inline_keyboard: inlineKBRDS.cool_games}}
            );
            break;

        case('Cool Race') :
            ctx.reply(`Функція в розробці`);
            break;

        case('Заняття на природі') :
            ctx.reply(`Функція в розробці`);
            break;

        case('Турніки') :
            ctx.reply(`Функція в розробці`);
            break;

        case('Завершити роботу') :
            ctx.reply(
                `Дякуємо, що завітали!`,
                {reply_markup: {remove_keyboard: true}}
            );
            break;

        default :
            ctx.reply(
                `Вибачте, такої команди не виявлено, спробуйте повернутися до початку роботи і перевірити вірність введених даних`,
                {reply_markup: {inline_keyboard: inlineKBRDS.toStart}}
            );
    }
}
