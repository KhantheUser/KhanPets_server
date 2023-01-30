const express = require('express')
const { createMessage,getMessages } = require('../controllers/messageController')
const router = express.Router()


router.route('/').post(createMessage)

router.route('/:conversationId').get(getMessages)

module.exports = router