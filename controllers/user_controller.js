const bcrypt = require('bcryptjs');
const User = require('../models/User');

class User_controller {

    async createUser(req, res) {
        try {
            const salt = await bcrypt.genSalt(10);
            let password = await bcrypt.hash(req.body.password, salt);
            await User.findOrCreate({
                where:
                    {
                        email: req.body.email,
                        password
                    }
            });
            const user = await User.findOne({
                where: {email: req.body.email}
            });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({
                message: error.message ? error.message : error
            })
        }
    }

}

module.exports = new User_controller()
