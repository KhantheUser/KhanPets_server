const factory  = require('./handleFactory')
const Animal = require('../models/Animal')
exports.createAnimal = factory.createOne(Animal)

exports.getAllAnimals = factory.getAll(Animal)
exports.getAnimal = factory.getOne(Animal,'user')