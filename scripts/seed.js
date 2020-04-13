const { Models } = require('../models/index')
const faker = require('faker')


for (let i = 0; i < 20; i++) {
   Models.Users.create({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        dob: `${faker.random.number(0,3)}${faker.random.number(2)}-${faker.random.number(6)}${faker.random.number(6)}-19${faker.random.number(6,9)}${faker.random.number(0,9)}`
    })  
} 

for (let i = 0; i < 20; i++) {
    Models.Artist.create({name: faker.name.findName()})   
 } 