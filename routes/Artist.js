const router = require('express').Router()
const { Models } = require('../models/index')
const Joi = require('joi')

const ArtistSchema = Joi.object().keys({
    name: Joi.string().min(2).required()
})

router.get('/', async (req,res) => {
    const Songs = await Models.Artist.findAll()
    res.json(Songs)
})

router.get('/:id', async (req,res) => {
    const Songs = await Models.Artist.findOne({
        where: {
            id: req.params.id
        }
    })
    res.json(Songs)
})

router.post('/new', async (req,res) => {
    Joi.validate(req.body, ArtistSchema, async (err, result) => {
        if (!err) {
            await Models.Artist.create(req.body).then((User) => {
                res.json(User)
            })
        } else {
            res.send
        }
    })
})

router.put('/:id', async (req,res) => {
    await Models.Artist.findOne({
        where: {
            id : req.params.id
        }
    }).then((User) => {
        User.update(req.body)
        res.json(User)
    })
})

router.delete('/:id', async (req,res) => {
    try {
        await Models.Artist.findOne({
            where: {
                id: req.params.id
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