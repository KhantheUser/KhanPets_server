const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    birth: {
      type: Date,
      required: [true, "Birth is required"],
    },
    username: {
      type: String,
      required: [true, "User name is required"],
    },
    password: {
      type: String,
      required: [true, "A user must have a password"],
      minlength: 8,
      // select : false
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [validator.isEmail, "Provide a valid email address"],
    },
    passwordConfirm: {
      type: String,
      required: [true, "A user must have a password confirmation"],

      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message: "Passwords are not the same",
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    pets: {
      type: Array,
      default: [],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.comparePassword = async function (
  candicatePassword,
  userPassword
) {
  return await bcrypt.compare(candicatePassword, userPassword);
};

userSchema.pre(/^find/, function (next) {
  this.select("username avatar _id email phone");
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
