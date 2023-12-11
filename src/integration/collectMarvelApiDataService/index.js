import getKnownCharactersByCharacterId from './getKnownCharactersByCharacterId.js';

const collectMarvelApiDataService = async (api, persistence) => {
  /**
   * Receives a CharacterId, fetches every character that co-participated on any of his comics and
   * persists every one of them to the database
   * @param {AxiosInstance} api - Axios instance to Marvel Api
   * @param {IPersistence} persistence - instance of the persistence layer
   * @return {Object[]} List of registered Marvel characters
   */

  const characterList = await getKnownCharactersByCharacterId(api);

  const responses = await Promise.all(
    characterList.map((character) => {
      persistence.createMarvelCharacter(
        character.id,
        character.name,
        character.description,
        character.thumbnail_url
      );
    })
  );

  return responses;
};

export default collectMarvelApiDataService;
