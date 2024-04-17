const express = require("express");
const router = express.Router();
const { connectDB } = require("../connection/db");
const { createBookModel } = require("../model/library");
const { User } = require("../model/user");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

connectDB();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"] || req.headers["Authorization"];

  if (!token) {
    return res.status(401).json({ error: "Access denied. Token is required." });
  }

  if (!process.env.SECRET_KEY) {
    return res
      .status(500)
      .json({ error: "Internal server error. Missing SECRET_KEY." });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log("Decoded token:", decoded);
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};


const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: formatJoiErrors(error) });
    }
    next();
  };
};

const formatJoiErrors = (error) => {
  return error.details.map((detail) => detail.message);
};

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
});

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

// const authenticateUser = (req, res, next) => {
//   const loggedInUser = req.cookies.user;

//   if (!loggedInUser) {
//     return res.status(401).json({ error: "Please log in to use this feature" });
//   }
//   next();
// };

router.post("/register", validateRequest(userSchema), async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const existingUsername = await User.findOne({ fullname });
    if (existingUsername) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const newUser = new User({ fullname, email });

    newUser.setPassword(password);

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      data: savedUser,
      clearInput: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
    });

    res
      .status(200)
      .json({ token: token, message: "Login successful", Name: user.fullname });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
});

router.post("/logout", async (req, res) => {
  res.status(200).json({ message: "Logout successful" });
});

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

module.exports = { router };
