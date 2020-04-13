const Sequelize  = require('sequelize')
const db = require('../db')

// Models
const Songs = require('./Songs')

const Albums = db.define('albums', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    artWorkPath: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Albums.hasMany(Songs)
db.sync()
module.exports = Albums
