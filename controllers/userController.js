
const factory = require('./handleFactory')
const User = require('../models/User')
exports.getUser = factory.getOne(User)