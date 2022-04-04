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
        },
        status: {
            type: Sequelize.STRING
        },
        confirmationCode: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    })

User.addScope(
    'user', {
        attributes: {
            exclude: ['confirmationCode', 'password']
        }
    }
)
module.exports = User
