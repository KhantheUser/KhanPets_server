const express = require("express");
const {
  createCart,
  getCardofUser,
  deleteMyCart,

  deleteAllCart,
} = require("../controllers/cartController");
const Cart = require("../models/Cart");

const routes = express.Router();

routes.route("/").post(createCart);

routes.route("/me/:id").get(getCardofUser).delete(deleteMyCart);
routes.route("/me/all/:id").delete(deleteAllCart);
module.exports = routes;
