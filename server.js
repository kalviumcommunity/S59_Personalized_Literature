const {
  connectDB,
  disconnectDB,
  isConnected,
} = require("./config/dbConnection");

const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  if (isConnected()) {
    res.send("📦 connected to mongoDB");
  } else {
    res.send("❌ error connecting to mongoDB");
  }
});

app.listen(port, () => {
  console.log(`App listening at port: ${port}`);
  connectDB();
});
