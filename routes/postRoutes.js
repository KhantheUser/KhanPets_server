const express = require("express");

const {
  createPost,
  getAllPost,
  deleteMyPost,
  updatePost,
} = require("../controllers/postController");

const routes = express.Router();

routes.route("/").post(createPost).get(getAllPost);
routes.route("/:id").delete(deleteMyPost).patch(updatePost);

module.exports = routes;
