const express = require("express");
const mongoose = require("mongoose");
let cookieParser = require("cookie-parser");
const cors = require("cors");
const { router } = require("./src/routes/routes");
const app = express();
const port = 8080;

app.use(cookieParser());
app.use(express.json());
app.use(cors());


app.use("/", router);

mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`App listening at port: ${port}`);
  });
});
