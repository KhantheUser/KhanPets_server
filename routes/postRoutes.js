const express = require("express");

const {
  createPost,
  getAllPost,
  deleteMyPost,
} = require("../controllers/postController");

const routes = express.Router();

routes.route("/").post(createPost).get(getAllPost);
routes.route("/:id").delete(deleteMyPost);

module.exports = routes;
