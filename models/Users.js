const Sequelize  = require('sequelize')
const db = require('../db')

const Users = db.define('users', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dob: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

db.sync()
module.exports = Users
 