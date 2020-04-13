require('dotenv').config()
const { Sequelize } = require('sequelize')

module.exports = new Sequelize({
    database: process.env.DATABASE,
    dialect: "postgres",
    username: process.env.USERNAME
})