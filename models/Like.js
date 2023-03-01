const mongoose = require("mongoose");
const LikeSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: [true, "A like must have postId"],
    },
    userId: {
      type: String,
      required: [true, "A like must have userId"],
    },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", LikeSchema);
module.exports = Like;
