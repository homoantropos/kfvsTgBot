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
                await User.scope('user').findOrCreate({
                    where:
                        {
                            email: req.body.email,
                            role: req.body.role,
                            password
                        }
                });
                const user = await User.scope('user').findOne({
                    where:
                        {
                            email: req.body.email
                        }
                });
                res.status(201).json(user);
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

    async updateUser(req, res) {
        try {
            const candidate = await User.scope('user').findOne({
                where: {email: req.body.email}
            });
            if(!candidate){
                const salt = await bcrypt.genSalt(10);
                let password = await bcrypt.hash(req.body.password, salt);
                await User.update({
                        email: req.body.email,
                        role: req.body.role,
                        password
                    },
                    {
                        where: {id: req.params.id}
                    });
                res.status(200).json({
                    message: `Дані користувача успішно змінено`
                });
            } else {
             res.status(500).json({
                 message: 'Ця адреса електронної пошти вже занята. Спробуйте іншу'
             })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async deleteUser(req, res) {
        try {
            await User.destroy({
                where: {id: req.params.id}
            });
            res.status(200).json({
                message: `Користувача успішно видалено`
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await User.scope('user').findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async getUserById(req, res) {
        try {
            const user = await User.scope('user').findOne({
                where: {id: req.params.id}
            });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new User_controller()
