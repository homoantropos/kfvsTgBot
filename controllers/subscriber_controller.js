const Subscriber = require('../models/Subscriber');
const Occasion = require('../models/Occasion');

class Subscriber_controller {

    async createSubscriber(ctx, option) {
        const {[option]: {from: {first_name}}} = ctx.update;
        const {[option]: {from: {last_name}}} = ctx.update;
        const {[option]: {from: {username}}} = ctx.update;
        const {[option]: {from: {id}}} = ctx.update;
        try {
            const subscriber = await Subscriber.findOne({
                where: {
                    tgId: id
                }
            });
            if(subscriber) {
                ctx.reply(`${first_name}, Ви вже підписані на цей бот`);
            } else {
                await Subscriber.findOrCreate({
                    where: {
                        first_name: first_name ? first_name : '',
                        last_name: last_name ? last_name : '',
                        username: username ? username : '',
                        tgId: id
                    }
                });
                ctx.reply(`Вітаємо, ${first_name}, ви успішно підписались на розсилку оновлень нашого бота!`);
            }
        } catch (error) {
            const errorMessage = error.message ? error.message : error;
            ctx.reply('під час підписки виникла помилка: ', errorMessage)
        }
    }

    async updateSubscriber(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteSubscriber(ctx) {
        const {message: {from: {first_name}}} = ctx.update;
        const {message: {from: {id}}} = ctx.update;
        try {
            const subscriber = await Subscriber.findOne({
                where: {
                    tgId: id
                }
            });
            if(!subscriber) {
                ctx.reply(`Ви не підписані на цей бот, скасувати підписку неможливо)`);
            } else {
                if (subscriber.status !== 'banned') {
                    await Subscriber.destroy({
                        where: {
                            tgId: id
                        }
                    });
                    ctx.reply(`${first_name}, шкода, що ти нас покидаєш( Ти завжди можеш повернутися! Будьте здорові в русі!`);
                } else {
                    ctx.reply(`${first_name}, нам шкода, але ви заблоковані в цьому боті. Щоб змінити це, зверністься до адміністратора.`);
                }
            }
        } catch (error) {
            const errorMessage = error.message ? error.message : error;
            ctx.reply('під час підписки виникла помилка: ', errorMessage)
        }
    }

    async getSubscriberById(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getSubscribers(req, res) {
        try {
            let subscribers = await Subscriber.scope('subs').findAll({include: {model: Occasion, as: 'occasions'}});
            if(req.query.occasionId) {
                subscribers = subscribers.filter(
                    subscriber => subscriber.occasionId === req.query.occasionId
                )
            }
            res.status(200).json(subscribers);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

}

module.exports = new Subscriber_controller()
