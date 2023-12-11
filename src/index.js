import dotenv from 'dotenv';
import express from 'express';
import marvelApiAxiosInstance from './integration/marvelApi.js';
import bodyParser from 'body-parser';
import routes from './routes.js';
import SequelizePersistence from './database/SequelizePersistence.js';

// .env config
dotenv.config();

// Express config
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initialize and sync database
const sequelizePersistence = new SequelizePersistence();
await sequelizePersistence.syncDatabase();

// Collect marvel api data and store to persistence layer
import collectMarvelApiDataService from './integration/collectMarvelApiDataService/index.js';
await collectMarvelApiDataService(marvelApiAxiosInstance, sequelizePersistence);

// Routing
routes(app, marvelApiAxiosInstance);

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});

// Handling service exitting
const exitGracefully = async () => {
  try {
    await SequelizePersistence.sequelize.close();
    console.log('Database connection closed successfully');
  } catch (error) {
    console.log('Error closing database connection:', error);
  }
};

app.on('close', async () => {
  console.log('\nServer is shutting down');
  exitGracefully();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('\nServer is shutting down');
  exitGracefully();
  process.exit(0);
});
