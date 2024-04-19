const express = require("express");
const mongoose = require("mongoose");
let cookieParser = require("cookie-parser");
const cors = require("cors");
const { router } = require("./src/routes/routes");
const app = express();
const port = 8080;

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "http://localhost:5174", credentials: true }));


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
