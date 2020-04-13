const Sequelize  = require('sequelize')
const db = require('../db')

// Models
const Songs = require('./Songs')
const Albums = require('./Albums')


const Artist = db.define('artist', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Artist.hasMany(Songs)
Artist.hasMany(Albums)
db.sync()
module.exports = Artist
