const router = require('express').Router()
const { Models } = require('../models/index')
const Joi = require('joi')

const UsersSchema = Joi.object().keys({
    firstName: Joi.string().min(2).alphanum().required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().trim().email({ minDomainSegments: 2}).allow(['.com','.net']).required(),
    password: Joi.string().min(6).alphanum().required(),
    dob: Joi.string().min(8).required()
}) 


router.get('/', async (req,res) => {
    const Users = await Models.Users.findAll()
    res.json(Users)
})

router.get('/:id', async (req,res) => {
    const User = await Models.Users.findOne({
        where: { id: req.params.id }
    })
    res.json(User)
})

router.post('/new', async (req,res) => {
    Joi.validate(req.body, UsersSchema, async (err, result) => {
        if (!err) {
            const Email = await Models.Users.findOne({ where: { email: req.body.email }})
            if (Email) {
                return res.json({
                    error: "This email already exist" 
                }) 
            }
            await Models.Users.create(req.body).then((User) => {
                res.json(User) 
            })
        }else {
            res.send(err) 
        }
    })
})

router.put('/:id', async (req,res) => {
    await Models.Users.findOne({
        where: { id: req.params.id }
    }).then((User) => {
        User.update(req.body)
        res.json(User)
    })
})

router.delete('/:id', async (req,res) => {
    await Models.Users.findOne({
        where: { id: req.params.id }
    }).then((User) => {
        User.destroy()
        res.json({
            status: "200 Ok",
            message: "User deleted"
        })
    })
})

module.exports = router