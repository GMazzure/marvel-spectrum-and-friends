require("dotenv").config();
const express = require("express");
const app = express();
const marvelApiAxiosInstance = require("./services/marvelApi");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Simple route
app.get("/", async (req, res) => {
  const data = await marvelApiAxiosInstance.get("/characters/1010705/comics");
  res.send(data);
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
