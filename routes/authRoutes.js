const express = require('express');
const { signup, login } = require('../controllers/authController');

const routes = express.Router()


routes.route('/signup')
.post(signup)

routes.route('/login')
.post(login)

module.exports = routes