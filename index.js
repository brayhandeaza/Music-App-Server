const express = require('express')
const bodyParder = require('body-parser')
const app = express()
const db = require('./db')

//Routes 
const Routes = require('./routes/index');

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
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port: ${port}`) 
})