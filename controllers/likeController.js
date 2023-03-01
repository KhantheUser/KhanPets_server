const Like = require("../models/Like");
const factory = require("./handleFactory");

exports.getLikes = factory.getAll(Like);
exports.createLike = factory.createOne(Like);
exports.deleteLike = factory.deleteOne(Like);
