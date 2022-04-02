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
    }
)


module.exports = Subscriber
