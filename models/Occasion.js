const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const Subscriber = require('../models/Subscriber');


const Occasion = sequelize.define(
    'occasion', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'occasion'
        },
        start: {
            type: Sequelize.DATE,
            allowNull: false,
            unique: 'occasion'
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        maxSubsNumber: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        posterSrc: {
            type: Sequelize.STRING,
            allowNull: true
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

Occasion.hasMany(
    Subscriber,
    {
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
    });

Subscriber.belongsToMany(
    Occasion,
    {
        as: 'subscribers',
        through: 'OccasionSubscriber',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
    });

Occasion.belongsToMany(
    Subscriber,
    {
        as: 'occasions',
        through: 'OccasionSubscriber',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
    });

Occasion.addScope(
    'occasion',
    {
        attributes: {
            include: ['id', 'name', 'start', 'description', 'maxSubsNumber', 'posterSrc']
        },
        include: [
            {
                model: Subscriber, as: 'subscribers'
            }
        ]
    }
)

module.exports = Occasion
