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

  const getMarvelCharactersToHtmlTable = async (req, res) => {
    try {
      const marvelCharacters = await persistenceLayer.getMarvelCharacters();

      if (!marvelCharacters || marvelCharacters.length === 0) {
        throw 'Persistence layer error or no marvel characters to retrieve';
      }

      let htmlTable = `
      <style>
        table, td, th {
          border: 1px solid black;
          padding: 1em;
        }
      </style>
      <table style="width: 100%;border-collapse: collapse;"><tr>
          <th>Id</th>
          <th>thumbnail</th>
          <th>Name</th>
          <th>Description</th>
        </tr>`;

      marvelCharacters.forEach((character) => {
        htmlTable += `<tr>
          <td>${character.character_id}</td>
          <td><img src=${character.thumbnail_url} width="200"/></td>
          <td>${character.name}</td>
          <td>${character.description}</td>
        </tr>`;
      });

      htmlTable += '</table>';

      res.status(HttpStatus.OK).send(htmlTable);
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
    getMarvelCharactersToHtmlTable,
  };
};

export default marvelCharactersController;
