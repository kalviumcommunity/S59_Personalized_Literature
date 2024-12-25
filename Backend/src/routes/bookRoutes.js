
const router = require("express").Router();
const { createBookModel } = require("../Model/library");
const {verifyToken} = require("./userAuth");
const {validateRequest,partialBookSchema,bookSchema} = require("./validateData");



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
    verifyToken,
    validateRequest(bookSchema),
    async (req, res) => {
      try {
        console.log(req.username);
        let BookModel = createBookModel(req.params.genre);
  
        if (Array.isArray(req.body)) {
          const savedBooks = await BookModel.insertMany(
            req.body.map((book) => ({ ...book, postedBy: req.username }))
          );
          res.status(201).json(savedBooks);
        } else {
          const newBook = new BookModel({ ...req.body, postedBy: req.username });
          const savedNewBook = await newBook.save();
          res.status(201).json(savedNewBook);
        }
      } catch (error) {
        res.status(400).json({ error: "Failed to insert data" });
      }
    }
  );
  
  
  // Route to update a book (requires authentication)
  router.patch(
    "/:genre/:id",
    verifyToken,
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
  
  // Route to delete a book (requires authentication)
  router.delete("/:genre/:id", verifyToken, async (req, res) => {
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

  module.exports = router ;