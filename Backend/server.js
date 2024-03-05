const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;

const { router } = require("./src/routes/routes");

app.use(express.json());
app.use("/", router);

mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`App listening at port: ${port}`);
  });
});
