const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const animalRoutes = require("./routes/animalRoutes");
const cartRoutes = require("./routes/cartRoutes");
const postRoutes = require("./routes/postRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const likeRoutes = require("./routes/likeRoutes");
const checkoutRoutes = require("./routes/checkoutRoute");
const globalErrorHandler = require("./controllers/errorsController.js");
const AppError = require("./utils/appError");

// MiddlewareStack
dotenv.config({
  path: "./.env",
});
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
  cors({
    origin: "https://khan-pets-client.vercel.app",
  })
);
app.set("view engine", "html");

// routes middlewares

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/animal", animalRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/post", postRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/checkout", checkoutRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl}`, 404));
});
app.use(globalErrorHandler);

const DB = process.env.MONGODB_URL.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
);
mongoose.connect(DB, () => {
  console.log("Connected to Mongo");
});
module.exports = app;
