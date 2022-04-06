const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');


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
        },
    }
)

Subscriber.addScope(
    'subs', {
        attributes: {
            include: ['first_name', 'last_name', 'username', 'status', 'tgId', 'id']
        }
    }
)
module.exports = Subscriber
