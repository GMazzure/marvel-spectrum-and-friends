import marvelCharactersControllerFactory from './controllers/marvelCharactersControllerFactory.js';

export default (app, marvelApiAxiosInstance, persistence) => {
  const marvelCharactersController = marvelCharactersControllerFactory(persistence);

  app.get('/json', marvelCharactersController.getMarvelCharacters);
  app.get('/html', marvelCharactersController.getMarvelCharactersToHtmlTable);

  // Simple route to test
  app.get('/hello', async (req, res) => {
    res.send('hello!');
  });
};
