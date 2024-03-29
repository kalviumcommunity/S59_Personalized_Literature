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


const User = mongoose.model("User", userSchema);

module.exports = { User };
