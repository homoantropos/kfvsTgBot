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
            type: Sequelize.TEXT,
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

Occasion.addScope(
    'occasion',
    {
        attributes: {
            include: ['id', 'name', 'start', 'description', 'maxSubsNumber', 'posterSrc']
        }
    }
)

module.exports = Occasion
