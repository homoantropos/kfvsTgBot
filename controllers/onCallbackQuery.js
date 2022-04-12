const keyboards = require("../keyboards/keyboard");
const inlineKBRDS = require("../keyboards/inlineKeyboards");
const subscriberController = require("./subscriber_controller");
const challenge = require('../views/challenge');
const Occasion = require("../models/Occasion");
const Subscriber = require("../models/Subscriber");
const checkSubs = require('../utils/occasionHasSubscriber');

module.exports = async ctx => {
    const {callback_query: {data}} = ctx.update;
    const {from: {id}} = ctx.update.callback_query;
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
            if (!is_bot) {
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
            try {
                const occasion = await Occasion.findOne({
                    include: {model: Subscriber, as: 'subscribers'},
                    where: {name: data}
                });
                if (occasion) {
                    await ctx.reply(occasion.description, {parse_mode: 'HTML'});
                    if(checkSubs(occasion, 'tgId', id)) {
                        ctx.reply('відписатися: ', {
                            reply_markup:
                                {
                                    inline_keyboard: [
                                        [
                                            {
                                                text: 'скасувати підписку!',
                                                url: `https://kfvstgbot.herokuapp.com/api/occasions/removeSub?occasion=${occasion.id}&subscriberId=${id}`
                                            }
                                        ]
                                    ]
                                }
                        })
                    } else {
                        ctx.reply('бути в курсі події: ', {
                            reply_markup:
                                {
                                    inline_keyboard: [
                                        [
                                            {
                                                text: 'підпишись!',
                                                url: `https://kfvstgbot.herokuapp.com/api/occasions/addSub?occasion=${occasion.id}&subscriberId=${id}`
                                            }
                                        ]
                                    ]
                                }
                        })
                    }
                } else {
                    ctx.reply(
                        `Вибачте, такої команди не виявлено, спробуйте повернутися до початку роботи і перевірити вірність введених даних або скористатися кнопокю "Контакти" для звязку з нами`,
                        {reply_markup: {inline_keyboard: inlineKBRDS.toStart}}
                    );
                }
            } catch (error) {
                console.log(error);
            }
    }
}
