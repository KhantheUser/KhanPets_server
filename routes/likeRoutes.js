const express = require("express");

const {
  getLikes,
  createLike,
  deleteLike,
} = require("../controllers/likeController");
const { deleteOne } = require("../models/Like");

const routes = express.Router();

routes.route("/").get(getLikes).post(createLike);
routes.route("/:id").delete(deleteLike);

// routes.route("/me/:id").get(getCardofUser).delete(deleteMyCart);

module.exports = routes;
