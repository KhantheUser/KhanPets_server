const express = require('express');
const {createCart,getCardofUser,deleteMyCart} = require('../controllers/cartController')

const routes = express.Router()


routes.route('/')
.post(createCart)

routes.route('/me/:id')
.get(getCardofUser)
.delete(deleteMyCart)

module.exports = routes