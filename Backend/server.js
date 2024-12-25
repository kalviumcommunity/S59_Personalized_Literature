const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./src/connection/db");

const app = express();
const port = 8080;

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("MongoDB connected.");
    
    // Listen for the 'connected' event
    mongoose.connection.on('connected', () => {
      console.log("MongoDB connection is open.");
    });

    // Listen for any errors in the MongoDB connection
    mongoose.connection.on('error', (error) => {
      console.error("MongoDB connection error:", error);
    });

    app.listen(port, () => {
      console.log(`App listening at port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


// Routes
const user = require("./src/routes/userRoutes");
const book = require("./src/routes/bookRoutes");

// Middleware
app.use(cookieParser());
app.use(express.json());

const origin = "http://localhost:5173";
app.use(cors({ origin, credentials: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Route Handling
app.use("/userRoutes", user);
app.use("/bookRoutes", book);
