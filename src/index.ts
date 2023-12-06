require("dotenv").config();
import express from "express";
import marvelApiAxiosInstance from "./services/marvelApi";

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Simple route
app.get("/", async (req, res) => {
  const data = await marvelApiAxiosInstance.get("/characters/1010705/comics");
  res.send(data);
});

// Simple route to test
app.get("/hello", async (req, res) => {
  res.send("hello!");
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
