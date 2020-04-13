const express = require('express')
require('dotenv').config()
const bodyParder = require('body-parser')
const app = express()
const db = require('./db')
const address = require('address')
//Routes 
const Routes = require('./routes/index')

app.use(bodyParder.json())

app.use('/users', Routes.Users)
app.use('/albums', Routes.Albums)
app.use('/artists', Routes.Artist)
app.use('/genres', Routes.Genres)
app.use('/songs', Routes.Songs)


app.get('/', async (req,res) => {
    res.json({
        status: "Ok",
        message: "Welcome to my music app Back-End"
    })
})

db.authenticate().then((res) => {
    console.log("Database is connected")
})

app.listen(process.env.PORT, process.env.HOST, async () => {
    console.log(`\nListening local on: http://${process.env.HOST}:${process.env.PORT}`) 
    await app.listen(process.env.PORT, address.ip(), () => {
        console.log(`Listening on own network on: http://${address.ip()}:${process.env.PORT}\n\n`) 
    })
})