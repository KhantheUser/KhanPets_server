const express = require('express')
const router = express.Router()
const {createConversation,getConversation,getAllConversation} = require('../controllers/conversationController')


router.route('/')
.post(createConversation)
.get(getConversation)

router.route('/me/:userId')
.get(getAllConversation)


module.exports = router