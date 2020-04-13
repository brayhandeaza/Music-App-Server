const router = require('express').Router()
const { Models } = require('../models/index')
const Joi = require('joi')
const { Op } = require('sequelize')

const AlbumSchema = Joi.object().keys({
    title: Joi.string().min(2).required(),
    artWorkPath: Joi.string().required(),
    artistId: Joi.number().required(),
    genreId: Joi.number().required()
})

router.get('/', async (req,res) => {
    const Songs = await Models.Songs.findAll()
    res.json(Songs)
})

router.get('/:artist_id', async (req,res) => {
    const Songs = await Models.Songs.findOne({
        where: {
            artistId: req.params.artist_id
        }
    })
    res.json(Songs)
})

router.get('/:artist', async (req,res) => {
    await Models.Songs.findAll({
        where: { title: {[Op.like]: '%' + req.query.term + '&'}}
    }).then((Songs) => {
        res.json(Songs)
    })
})

router.get('/:artist_id/genre/:genre_id', async (req,res) => {
    const Songs = await Models.Songs.findOne({
        where: {
            artistId: req.params.artist_id
        }
    })
    res.json(Songs)
})

router.post('/artist/:artist_id/genre/:genre_id', async (req,res) => {
    Joi.validate(req.body, AlbumSchema, async (err, result) => {
        if (!err) {
            await Models.Songs.create({
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

router.put('/artist/:artist_id/genre/:genre_id/:id', async (req,res) => {
    await Models.Songs.findOne({
        where: {
            id: req.params.id,
            artistId: req.params.artist_id,
            genreId: req.params.genre_id
        }
    }).then((User) => {
        User.update(req.body)
        res.json(User)
    })
})

router.delete('/artist/:artist_id/genre/:genre_id/:id', async (req,res) => {
    try {
        await Models.Songs.findOne({
            where: {
                id: req.params.id,
                artistId: req.params.artist_id,
                genreId: req.params.genre_id
            }
        }).then((User) => {
            User.destroy()
            res.json({
                statu: "Ok",
                message: "Artist deleted"
            })
        }) 
    } catch (error) {
        res.send(error)
    }
})

module.exports = router