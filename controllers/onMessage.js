const inlineKBRDS = require('../keyboards/inlineKeyboards');
const keyboards = require("../keyboards/keyboard");
const views = require("../views/views");
const subscriberController = require('../controllers/subscriber_controller');
const Subscriber = require('../models/Subscriber');

module.exports = async ctx => {
    const {message: {text}} = ctx.update
    switch (text.trim().toLowerCase()) {

         case('/start') :
             const {from: {first_name}} = ctx.update.message;
             const {from: {id}} = ctx.update.message;
            const subscriber = await Subscriber.scope('subs').findOne({
                where: {tgId: id}
            })
             if(!subscriber) {
                 ctx.reply(
                     `Привіт, ${first_name}! Для продовження обери, що тебе цікавить:`,
                     {reply_markup: {keyboard: keyboards.start}});
                 ctx.reply(`також ти можеш підписатися, щоб не пропустити найцікавіше!`,
                     {reply_markup: {inline_keyboard: inlineKBRDS.subscribe}});
             } else {
                 ctx.reply(
                     `Привіт, ${first_name}! Для продовження обери, що тебе цікавить:`,
                     {reply_markup: {keyboard: keyboards.start}});
             }
            break;

        case('/help') :
            ctx.reply(views.help, {parse_mode: 'HTML'});
            break;

        case('/subscribe') :
            const {message: {from: {is_bot}}} = ctx.update;
            if(!is_bot) {
                await subscriberController.createSubscriber(ctx, 'message');
            } else {
                ctx.reply('Боти не можуть підписуватись на бота.')
            }
            break;

        case('/unsubscribe') :
                await subscriberController.deleteSubscriber(ctx);
            break;

        case('фізична культура') :
            ctx.reply(
                `Вітаємо на сторінці фізичної культури`,
                {reply_markup: {keyboard: keyboards.physical_culture}});
            break;

        case('спорт') :
            ctx.reply(
                `Вітаємо на сторінці спорту`,
                {reply_markup: {keyboard: keyboards.sport}});
            break;

        case('путин хуйло') :
            ctx.reply(
                `Иди на хуй!!!`
            );
            break;

        case('русский корабль') :
            ctx.reply(
                `Иди на хуй!!!`
            );
            break;

        case('россия') :
            ctx.reply(
                `Иди на хуй!!!`
            );
            break;

        case('путин') :
            ctx.reply(
                `хуйло!!!`
            );
            break;

        case('слава україні!') :
            ctx.reply(
                `Героям слава!!!`
            );
            break;

        case('україна!') :
            ctx.reply(
                `Понад усе!!!`
            );
            break;

        case('здорова україна') :
            ctx.reply(
                'для повернення до меню натисніть "Назад"',
                {reply_markup: {remove_keyboard: true}});
            ctx.reply(
                'Актуальні заходи для здобувачів освіти',
                {reply_markup: {inline_keyboard: inlineKBRDS.events}});
            break;

        case('семінари') :
            ctx.reply(
                'для повернення до меню натисніть "Назад"',
                {reply_markup: {remove_keyboard: true}});
            ctx.reply(
                'Семінари з різних аспектів рухової активності:',
                {reply_markup: {inline_keyboard: inlineKBRDS.seminars}});
            break;

        case('контакти') :
            ctx.reply(views.contacts, {parse_mode: 'HTML'});
            break;

        case('заняття вдома') :
            ctx.reply(
                'для повернення до меню натисніть "Назад"',
                {reply_markup: {remove_keyboard: true}}
            );
            ctx.reply(`Фізична культура он-лайн`,
                {reply_markup: {inline_keyboard: inlineKBRDS.home}}
            );
            break;

        case('вперед - до зірок!') :
            ctx.reply(
                'для повернення до меню натисніть "Назад"',
                {reply_markup: {remove_keyboard: true}}
            );
            ctx.reply(`Рухаємось, як зірки!`,
                {reply_markup: {inline_keyboard: inlineKBRDS.stars}}
            );
            break;

        case('уроки') :
            ctx.reply(
                'для повернення до меню натисніть "Назад"',
                {reply_markup: {remove_keyboard: true}}
            );
            ctx.reply(
                'Модельна навчальна програма «Фізична культура. 5-6 класи»',
                {reply_markup: {inline_keyboard: inlineKBRDS.lessons}}
            );
            break;

        case('cool games') :
            ctx.reply(
                'для повернення до меню натисніть "Назад"',
                {reply_markup: {remove_keyboard: true}}
            );
            ctx.reply(
                `Все про Cool Games`,
                {reply_markup: {inline_keyboard: inlineKBRDS.cool_games}}
            );
            break;

        case('cool race') :
            ctx.reply(`Функція в розробці`);
            break;

        case('olympic junior games') :
            ctx.reply(`Функція в розробці`);
            break;

        case('міжнародні заходи') :
            ctx.reply(`Функція в розробці`);
            break;

        case('всеукраїнські заходи') :
            ctx.reply(`Функція в розробці`);
            break;

        case('заняття на природі') :
            ctx.reply(`Функція в розробці`);
            break;

        case('турніки') :
            ctx.reply(`Функція в розробці`);
            break;

        case(new RegExp('/ban')) :
            ctx.reply(`забанити?`);
            break;

        case('завершити роботу') :
            ctx.reply(
                `Дякуємо, що завітали!`,
                {reply_markup: {remove_keyboard: true}}
            );
            break;

        default :
            ctx.reply(
                `Вибачте, такої команди не виявлено, спробуйте повернутися до початку роботи і перевірити вірність введених даних або скористатися кнопокю "Контакти" для звязку з нами`,
                {reply_markup: {inline_keyboard: inlineKBRDS.toStart}}
            );
    }
}
