const factory = require("../controllers/handleFactory");
const Post = require("../models/Post");

exports.createPost = factory.createOne(Post);
exports.getAllPost = factory.getAll(Post);
exports.deleteMyPost = factory.deleteOne(Post);
