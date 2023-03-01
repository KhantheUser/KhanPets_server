const factory = require("../controllers/handleFactory");
const Post = require("../models/Post");
const catchAsync = require("../utils/catchAsync");

exports.createPost = factory.createOne(Post);
exports.getAllPost = factory.getAll(Post);
exports.deleteMyPost = factory.deleteOne(Post);
exports.updatePost = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const postId = req.params.id;
  const { userId } = req.body;
  const doc = await Post.findById(postId);

  if (!doc) {
    return next(new AppError("document not found with that ID", 404));
  }
  if (!doc.likes.includes(userId)) {
    doc.likes.push(userId);
    await doc.save();
  } else {
    doc.likes = doc.likes.filter((user) => user !== userId);
    await doc.save();
  }
  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
