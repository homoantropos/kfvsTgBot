const Occasion = require('../models/Occasion');

class Occasion_controller {

    async createOccasion (req, res) {
        try {
            const occasion = await Occasion.findOrCreate({
                where: {
                    name: req.body.name,
                    date: req.body.date ? req.body.date : null,
                    description: req.body.description ? req.body.description : '',
                    posterSrc: req.body.posterSrc ? req.body.posterSrc : ''
                }
            });
            res.status(200).json(occasion[0]);
        } catch(error) {
            res.status(500).json({
                message: error.error.message ? error.error.message : error
            })
        }
}

    async updateOccasion (req, res) {
        try {

        } catch(error) {
            res.status(500).json({
                message: error.error.message ? error.error.message : error
            })
        }
    }

    async deleteOccasion (req, res) {
        try {

        } catch(error) {
            res.status(500).json({
                message: error.error.message ? error.error.message : error
            })
        }
    }

    async getAllOccasions (req, res) {
        try {

        } catch(error) {
            res.status(500).json({
                message: error.error.message ? error.error.message : error
            })
        }
    }

    async getOccasionById (req, res) {
        try {

        } catch(error) {
            res.status(500).json({
                message: error.error.message ? error.error.message : error
            })
        }
    }

    async addSubscriber (req, res) {
        try {

        } catch(error) {
            res.status(500).json({
                message: error.error.message ? error.error.message : error
            })
        }
    }

}

module.exports = new Occasion_controller()
