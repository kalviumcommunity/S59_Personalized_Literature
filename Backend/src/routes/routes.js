const express = require("express");
const router = express.Router();
const { connectDB } = require("../connection/db");
const { createBookModel } = require("../model/library");
const Joi = require('joi');

connectDB();

// Defining  a schema for the book data for post,put 
const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  year: Joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
});

// Defining a schema for partial book data for patch method
const partialBookSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  genre: Joi.string(),
  year: Joi.number().integer().min(1000).max(new Date().getFullYear())
}).min(1); // At least one key is required for partial update

router.get("/:genre", async (req, res) => {
  try {
    console.log(req.params);
    let BookModel = createBookModel(req.params.genre); 
    
    const booksData = await BookModel.find();

    res.send(booksData);
    console.log(booksData)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/postBook/:genre", async (req, res) => {
  try {
    const { error } = bookSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

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
    console.log(error)
    res.status(400).json({ error: "Failed to insert data" });
  }
});

router.patch("/:genre/:id", async (req, res) => {
  try {
    const { error } = partialBookSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

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
});

router.put("/:genre/:id", async (req, res) => {
  try {
    const { error } = bookSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let BookModel = createBookModel(req.params.genre);

    const updateStatus = await BookModel.findByIdAndUpdate(
      req.params.id
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
