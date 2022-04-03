const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

class User_controller {

    async createUser(req, res) {
        const candidate = await User.findOne({
            where: {email: req.body.email}
        });
        if (!candidate) {
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

    async login(req, res) {
        try {
            const candidate = await User.findOne({
                where: {
                    email: req.body.email
                }
            });
            if (!candidate) {
                res.status(404).json({
                    message: 'EMAIL_NOT_FOUND'
                })
            }
            const passwordCompare = await bcrypt.compare(req.body.password, candidate.password);
            if (passwordCompare) {
                const token = jwt.sign({
                    email: candidate.email,
                    role: candidate.role,
                    userId: candidate.id
                }, keys.jwt, {expiresIn: 60 * 60});
                res.status(200).json({
                    token: `Bearer ${token}`
                });
            } else {
                res.status(401).json({
                    message: 'INVALID_PASSWORD'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllUsers(req, res) {
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
