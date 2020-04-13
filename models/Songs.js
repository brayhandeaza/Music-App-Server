const Sequelize  = require('sequelize')
const db = require('../db')

const Songs = db.define('songs', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    duration: {
        type: Sequelize.STRING,
        allowNull: false
    },
    path: {
        type: Sequelize.STRING,
        allowNull: false
    },
    albumOrder: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    plays: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

db.sync()
module.exports = Songs
 