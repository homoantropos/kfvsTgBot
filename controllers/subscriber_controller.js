const Subscriber = require('../models/Subscriber');

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
                if(subscriber.status !== 'banned') {
                    await Subscriber.destroy({
                        where: {
                            tgId: id
                        }
                    });
                }
                ctx.reply(`${first_name}, шкода. що ви нас покидаєте( Ви завжди можете повернутися! Будьте здорові в русі!`);
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
            const subscribers = await Subscriber.findAll();
            res.status(200).json(subscribers);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

}

module.exports = new Subscriber_controller()
