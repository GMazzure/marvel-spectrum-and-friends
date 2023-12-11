import HttpStatus from 'http-status-codes';

const marvelCharactersController = (persistenceLayer) => {
  const getMarvelCharacters = async (req, res) => {
    try {
      const marvelCharacters = await persistenceLayer.getMarvelCharacters();

      if (!marvelCharacters || marvelCharacters.length === 0) {
        throw 'Persistence layer error or no marvel characters to retrieve';
      }

      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Marvel Characters fetched successfully',
        data: marvelCharacters,
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to fetch marvel characters!',
        data: null,
      });
    }
  };

  return {
    getMarvelCharacters,
  };
};

export default marvelCharactersController;
