const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      salt: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = crypto.createHash("sha512").update(password).digest("hex");
};

userSchema.methods.validatePassword = function (password) {
  const hash = crypto.createHash("sha512").update(password).digest("hex");
  return this.password === hash;
};

const User = mongoose.model("user", userSchema);

module.exports = { User };
