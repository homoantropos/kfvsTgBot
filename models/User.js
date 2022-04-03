const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

User.addScope(
    'user', {
        attributes: {
            exclude: ['password']
        }
    }
)
module.exports = User
