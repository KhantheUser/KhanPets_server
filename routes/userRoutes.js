const express = require('express');
const {getUser} = require('../controllers/userController')
const routes = express.Router()

routes.route('/:id')
.get(getUser)



module.exports = routes