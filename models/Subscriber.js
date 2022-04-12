const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const Occasion = require('../models/Occasion');


const Subscriber = sequelize.define(
    'subscriber',
    {
        tgId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

Subscriber.addScope(
    'subs', {
        attributes: {
            include: ['first_name', 'last_name', 'username', 'status', 'tgId', 'id']
        },
        include: [
            {
                model: Occasion, as: 'occasions'
            }
        ]
    }
)
module.exports = Subscriber
