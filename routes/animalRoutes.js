const express = require('express');
const { createAnimal ,getAllAnimals,getAnimal} = require('../controllers/animalController');


const routes = express.Router()


routes.route('/')
.post(createAnimal)
.get(getAllAnimals)

routes.route('/:id')
.get(getAnimal)



module.exports = routes