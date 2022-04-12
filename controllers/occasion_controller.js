const Occasion = require('../models/Occasion');
const Subscriber = require('../models/Subscriber');
const moment = require("moment");

class Occasion_controller {

    async createOccasion(req, res) {
        try {
            moment.locale('uk-UK');
            const occasion = await Occasion.findOrCreate({
                where: {
                    name: req.body.name,
                    start: req.body.start,
                    description: req.body.description,
                    maxSubsNumber: req.body.maxSubsNumber,
                    posterSrc: req.body.posterSrc ? req.body.posterSrc : ''
                }
            });
            res.status(200).json({
                message: 'вітаємо! подію успішно додано до бази даних! перевірте внесені дані і продовжіть роботу:',
                occasion: occasion[0]
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async updateOccasion(req, res) {
        try {
            await Occasion.update(
                {
                    name: req.body.name,
                    start: req.body.start,
                    description: req.body.description,
                    maxSubsNumber: req.body.maxSubsNumber,
                    posterSrc: req.body.posterSrc ? req.body.posterSrc : ''
                }, {
                    where: {
                        id: req.params.id
                    }
                });
            const occasion = await Occasion.scope('occasion').findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({
                message: 'зміни успішно збережено! перевірте внесені дані і продовжіть роботу:',
                occasion: occasion
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteOccasion(req, res) {
        try {
            await Occasion.destroy(
                {
                    where: {
                        id: req.params.id
                    }
                });
            res.status(200).json({
                message: 'Подію успішно видалено!'
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllOccasions(req, res) {
        try {
            const occasions = await Occasion.findAll({include: {model: Subscriber, as: 'subscribers'}});
            res.status(200).json(occasions);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getOccasions(month) {
        let occasions = await Occasion.scope('occasion').findAll(
            {
                order: [
                    ['start', 'DESC']
                ]
            }
        );
        if (typeof month !== 'undefined') {
            occasions = occasions.filter(occasion => (new Date(occasion.start)).getMonth() === month);
        }
        return occasions
    }

    async getOccasionById(req, res) {
        try {
            const occasion = await Occasion.findOne(
                {
                    where: {
                        id: req.params.id
                    }
                });
            res.status(200).json(occasion);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async addSubscriber(req, res) {
        try {
            const occasion = await Occasion.scope('occasion').findOne({
                where: {
                    id: req.query.occasion
                }
            });
            const subscriber = await Subscriber.findOne({
                where: {
                    tgId: req.query.subscriberId
                }
            })
            await occasion.addSubscriber(subscriber, {through: 'OccasionSubscriber'});
            res.status(200).json({
                message: 'success!'
            })
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

}

module.exports = new Occasion_controller()
