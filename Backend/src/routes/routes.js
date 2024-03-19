const express = require("express");
const router = express.Router();
const { connectDB } = require("../connection/db");
const { createBookModel } = require("../model/library");
const Joi = require("joi");

connectDB();

// Middleware for Joi validation
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: formatJoiErrors(error) });
    }
    next();
  };
};

// Utility function for formatting Joi error messages
const formatJoiErrors = (error) => {
  return error.details.map((detail) => detail.message);
};

// Extract year validation logic into a function
const getYearValidation = () => {
  return Joi.number()
    .integer()
    .min(1000)
    .max(new Date().getFullYear())
    .required();
};

// Update your Joi schemas
const bookSchema = Joi.object({
  bookName: Joi.string().required(),
  url: Joi.string().required(),
  genre: Joi.string().required(),
  publishedYear: getYearValidation(),
  author: Joi.string().required(),
}).unknown(false);

const partialBookSchema = Joi.object({
  bookName: Joi.string(),
  url: Joi.string(),
  genre: Joi.string(),
  publishedYear: getYearValidation(),
  author: Joi.string(),
})
  .min(1)
  .unknown(false);

router.get("/:genre", async (req, res) => {
  try {
    let BookModel = createBookModel(req.params.genre);
    const booksData = await BookModel.find();
    res.send(booksData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post(
  "/postBook/:genre",
  validateRequest(bookSchema),
  async (req, res) => {
    try {
      let BookModel = createBookModel(req.params.genre);

      if (Array.isArray(req.body)) {
        const savedBooks = await BookModel.insertMany(req.body);
        res.status(201).json(savedBooks);
      } else {
        const newBook = new BookModel(req.body);
        const savedNewBook = await newBook.save();
        res.status(201).json(savedNewBook);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Failed to insert data" });
    }
  }
);


router.patch(
  "/:genre/:id",
  validateRequest(partialBookSchema),
  async (req, res) => {
    try {
      let BookModel = createBookModel(req.params.genre);

      const updateStatus = await BookModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      if (updateStatus) {
        res.status(200).json(updateStatus);
      } else {
        res.status(404).json({ error: "Data Not Found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.put("/:genre/:id", validateRequest(bookSchema), async (req, res) => {
  try {
    let BookModel = createBookModel(req.params.genre);

    const updateStatus = await BookModel.findByIdAndUpdate(
      req.params.id,
      req.body, // Add the actual update statement
      { new: true }
    );

    if (updateStatus) {
      res.status(200).json(updateStatus);
    } else {
      res.status(404).json({ error: "Data Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:genre/:id", async (req, res) => {
  try {
    let BookModel = createBookModel(req.params.genre);

    const deleteStatus = await BookModel.findByIdAndDelete(req.params.id);

    if (deleteStatus) {
      res.status(200).json({ message: "Data deleted successfully" });
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { router };
