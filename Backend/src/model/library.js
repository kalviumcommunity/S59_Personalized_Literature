const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publishedYear: {
      type: Number,
    },
    author: {
      type: String,
      required: true,
    },
    postedBy : {
      type: String,
      required : true,
    }
  },
  { versionKey: false }
);

const createBookModel = (collectionName) => {
  return mongoose.model(collectionName, bookSchema);
};

module.exports = { createBookModel };
