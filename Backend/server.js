const express = require("express");
const mongoose = require("mongoose");
let cookieParser = require("cookie-parser");
const cors = require("cors");
const { router } = require("./src/routes/routes");
const app = express();
const port = 8080;

app.use(cookieParser());
app.use(express.json());
const origin =  "https://s59personalizedliterature-diwanshu.netlify.app/" || "http://localhost:5173"
app.use(cors({ origin , credentials: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/", router);

mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`App listening at port: ${port}`);
  });
});
