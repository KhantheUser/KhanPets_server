const express = require('express');
const {createPost, getAllPost} = require('../controllers/postController')


const routes = express.Router()


routes.route('/')
.post(createPost)
.get(getAllPost)





module.exports = routes