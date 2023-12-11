import marvelCharactersControllerFactory from './controllers/marvelCharactersControllerFactory.js';

export default (app, marvelApiAxiosInstance, persistence) => {
  const marvelCharactersController = marvelCharactersControllerFactory(persistence);

  app.get('/', marvelCharactersController.getMarvelCharacters);

  // Simple route to test
  app.get('/hello', async (req, res) => {
    res.send('hello!');
  });
};
