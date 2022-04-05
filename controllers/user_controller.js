const path = require('path');
const bcrypt = require('bcryptjs');
const nodemailer = require('../utils/nodemailer');
const keys = require('../config/keys');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const userConfirmationCodeGenerator = require('../utils/userConfirmationCodeGenerator')
const UserConfirmationCodeProvider = require('../utils/confirmationCodeProvider')

class User_controller {

    async createUser(req, res) {
        const candidate = await User.findOne({
            where: {email: req.body.email}
        });
        if (!candidate) {
            try {
                const salt = await bcrypt.genSalt(10);
                let password = await bcrypt.hash(req.body.password, salt);
                const confirmationCode = userConfirmationCodeGenerator.confirmationCode();
                await User.scope('user').findOrCreate({
                    where:
                        {
                            email: req.body.email,
                            role: req.body.role,
                            password,
                            status: 'pending',
                            confirmationCode
                        }
                });
                const user = await User.scope('user').findOne({
                    where:
                        {
                            email: req.body.email
                        }
                });
                nodemailer.sendConfirmationEmail(user.name, user.email, confirmationCode);
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

    async confirmUser(req, res) {
        try {
            const user = await User.findOne({
                where: {confirmationCode: req.params.confirmationCode}
            });
            if (user) {
                await User.update({
                    status: 'active'
                }, {
                    where: {confirmationCode: req.params.confirmationCode}
                })
                res.status(201).send(
                    `<h1
                        style="
                               position: absolute;
                               left: 50%;
                               transform: translate(-50%);
                               margin-top: 10px;
                               font-family: oswald, 'Roboto Thin',sans-serif;
                               color: green;
                               "
                    ><b>Вітаємо! Ваш аккаунт активовано!</b></h1>`
                );
            } else {
                res.status(401).json({
                    message: 'Код підтвердження не співпадає'
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async sentLinkToResetPassword(req, res) {
        try {
            console.log(process.env);
            const candidate = await User.findOne({
                where: {email: req.body.email}
            })
            if (!candidate) {
                res.status(401).json({
                    message: 'Такого користувача не існує. Перевірте адресу електронної пошти'
                })
            } else {
                nodemailer.sendLinkForPasswordReset(candidate.name, candidate.email, candidate.confirmationCode);
                res.status(201).json({
                    message: 'Лист з інструкціями по відновленню пароля надіслано на вашу електронну пошту.'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    sentFormForPasswordReset(req, res) {
        try {
            let code = req.url.toString();
            code = code.replace('/reset/', '');
            UserConfirmationCodeProvider._userConfirmationCode = code.slice();
            const filePath = path.resolve('views', 'password_reset_form.html');
            res.status(200).sendFile(filePath);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

    async resetPassword(req, res) {
        try {
            const candidate = await User.findOne({
                where: {confirmationCode: UserConfirmationCodeProvider._userConfirmationCode}
            })
            if (!candidate) {
                const warningPath = path.resolve('views', 'invalid_confirmationCode_warning.html');
                res.status(401).sendFile(warningPath);
            } else {
                const salt = await bcrypt.genSalt(10);
                const password = await bcrypt.hash(req.query.password.trim(), salt);
                const confirmationCode = userConfirmationCodeGenerator.confirmationCode();
                await User.update({
                    password,
                    confirmationCode
                }, {
                    where: {email: candidate.email}
                });
                res.status(201).send(
                    `<h1
                        style="
                               position: absolute;
                               left: 50%;
                               transform: translate(-50%);
                               margin-top: 10px;
                               font-family: oswald, 'Roboto Thin',sans-serif;
                               color: green;
                               "
                    ><b>Вітаємо! Ваш пароль змінено! Ви можете повернутися на сайт і повторити спробу увійти!</b></h1>`
                );
            }
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
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
            if(user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({
                    message: 'Такого користувача в базі даних не існує'
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }
}

module.exports = new User_controller()
