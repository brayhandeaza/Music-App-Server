const router = require('express').Router()
const { Models } = require('../models/index')
const Joi = require('joi')

const AlbumSchema = Joi.object().keys({
    title: Joi.string().min(2).required(),
    artWorkPath: Joi.string().required(),
    artistId: Joi.number().required(),
    genreId: Joi.number().required()
})

// Get All Albums
router.get('/', async (req,res) => {
    const Songs = await Models.Albums.findAll()
    res.json(Songs)
})

// Get One Album by artist and genres
router.get('/:id', async (req,res) => {
    const Songs = await Models.Albums.findOne({
        where: {
            id: req.params.id
        }
    })
    res.json(Songs)
})

router.post('/artist/:artist_id/genre/:genre_id', async (req,res) => {
    Joi.validate(req.body, AlbumSchema, async (err, result) => {
        if (!err) {
                await Models.Albums.create({
                    title: req.body.title,
                    artWorkPath: req.body.artWorkPath,
                    artistId: req.params.artist_id,
                    genreId: req.params.genre_id
                }).then((User) => {
                    res.json(User)
                })
        }
        res.send(err)
    })
})

router.put('/:id', async (req,res) => {
    await Models.Albums.findOne({
        where: {
            id: req.params.id
        }
    }).then((User) => {
        User.update(req.body)
        res.json(User)
    })
})

router.delete('/:id', async (req,res) => {
    await Models.Albums.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({message: `${req.params.is} deleted`})
})

module.exports = router