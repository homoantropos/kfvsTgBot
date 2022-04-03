const bcrypt = require('bcryptjs');
const User = require('../models/User');

class User_controller {

    async createUser(req, res) {
        const candidate = await User.findOne({
            where: {email: req.body.email}
        });
        if(!candidate) {
            try {
                const salt = await bcrypt.genSalt(10);
                let password = await bcrypt.hash(req.body.password, salt);
                const user = await User.findOrCreate({
                    where:
                        {
                            email: req.body.email,
                            role: req.body.role,
                            password
                        }
                });
                res.status(201).json(user[0]);
            } catch (error) {
                res.status(500).json({
                    message: error.message ? error.message : error
                })
            }
        } else {
            res.status(500).json({
                message: 'Така адреса електронної пошти взе зайнята'
            })
        }

    }

    async getAllUsers (req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

}

module.exports = new User_controller()
