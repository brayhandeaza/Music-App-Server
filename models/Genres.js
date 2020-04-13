const Sequelize  = require('sequelize')
const db = require('../db')

// Models
const Songs = require('./Songs')
const Albums = require('./Albums')

const Genres = db.define('genres', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Genres.hasMany(Songs)
Genres.hasMany(Albums)
db.sync()
module.exports = Genres
