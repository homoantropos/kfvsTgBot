const Subscriber = require('../models/Subscriber');

class Subscriber_controller {

    async createSubscriber(ctx, res) {
        const {message: {from: {id}}} = ctx.update;
        await Subscriber.findOrCreate({
            where: {
                tgId: id
            }
        });
        ctx.reply(`Вітаємо! Ви успішно підписалися на оновлення нашого боту!`);
    }

    async updateSubscriber(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteSubscriber(req, res) {
        try {

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
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

        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

}

module.exports = new Subscriber_controller()
