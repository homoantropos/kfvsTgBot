const keyboards = require("../keyboards/keyboard");
const inlineKBRDS = require("../keyboards/inlineKeyboards");
const subscriberController = require("./subscriber_controller");
const challenge = require('../views/challenge');
const Occasion = require("../models/Occasion");

module.exports = async ctx => {
    const {callback_query: {data}} = ctx.update;
    switch (data) {

        case ('Фізична культура') :
            ctx.reply(
                `Вітаємо на сторінці фізичної культури`,
                {reply_markup: {keyboard: keyboards.physical_culture}}
            );
            break

        case ('/start') :
            ctx.reply(
                `Вітаємо на головній сторінці`,
                {reply_markup: {keyboard: keyboards.start}}
            );
            break

        case('/subscribe') :
            const {from: {is_bot}} = ctx.update.callback_query;
            if(!is_bot) {
                await subscriberController.createSubscriber(ctx, 'callback_query');
            } else {
                ctx.reply('Боти не можуть підписуватись на бота.')
            }
            break;

        case('/unsubscribe') :
            await subscriberController.deleteSubscriber(ctx);
            break;

        case ('Функція в розробці') :
            ctx.answerCbQuery(data);
            break;

        case ('ДО ПЕРЕМОГИ') :
            ctx.reply(challenge, {parse_mode: 'HTML'});
            break;

        default :
            try{
                const occasion = await Occasion.scope('occasion').findOne({
                    where: {
                        name: text
                    }
                });
                if(occasion) {
                    ctx.reply(
                        occasion.description,
                        {reply_markup: {inline_keyboard: inlineKBRDS.toStart}}
                    );
                } else {
                    ctx.reply(
                        `Вибачте, такої команди не виявлено, спробуйте повернутися до початку роботи і перевірити вірність введених даних або скористатися кнопокю "Контакти" для звязку з нами`,
                        {reply_markup: {inline_keyboard: inlineKBRDS.toStart}}
                    );
                }
            } catch(error) {
                console.log(error);
            }
    }
}
