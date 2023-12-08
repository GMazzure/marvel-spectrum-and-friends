import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import marvelApiAxiosInstance from './integration/marvelApi.js';
import bodyParser from 'body-parser';

import db from './database/Database.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Simple route
app.get('/', async (req, res) => {
  const data = await marvelApiAxiosInstance.get('/characters/1010705/comics');
  res.send(data);
});

// Simple route to test
app.get('/hello', async (req, res) => {
  res.send('hello!');
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});

app.on('close', async () => {
  console.log('Server is shutting down');
  try {
    await db.sequelize.close();
    console.log('Database connection closed successfully');
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
  process.exit(0);
});