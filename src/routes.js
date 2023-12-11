export default (app, marvelApiAxiosInstance) => {
  app.get('/', async (req, res) => {
    const data = await marvelApiAxiosInstance.get('/characters/1010705/comics');
    res.send(data);
  });

  // Simple route to test
  app.get('/hello', async (req, res) => {
    res.send('hello!');
  });  
};
