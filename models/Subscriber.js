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
        subscribedAt: {
            type: Sequelize.DATE,
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

Occasion.belongsToMany(
    Subscriber,
    {
        through: 'OccasionSubscriber',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });

Subscriber.belongsToMany(
    Occasion,
    {
        through: 'OccasionSubscriber',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });

Subscriber.addScope(
    'subs', {
        attributes: {
            include: ['first_name', 'last_name', 'username', 'status', 'tgId', 'id']
        }
    }
)
module.exports = Subscriber
