const Cart = require("../models/Cart");
const factory = require("../controllers/handleFactory");
const catchAsync = require("../utils/catchAsync");
exports.createCart = factory.createOne(Cart);

exports.getCardofUser = catchAsync(async (req, res, next) => {
  const cart = await Cart.find({ userId: req.params.id }).populate("product");
  res.status(200).json({
    status: "success",
    data: {
      data: cart,
    },
  });
});

exports.deleteMyCart = factory.deleteOne(Cart);
exports.deleteAllCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  const data = await Cart.deleteMany({ userId: id });
  res.status(204).json({
    status: "success",
    data: {
      data: data,
    },
  });
});
