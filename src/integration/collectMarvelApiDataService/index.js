import getKnownCharactersByCharacterId from './getKnownCharactersByCharacterId.js';

const collectMarvelApiDataService = async (api, persistence) => {
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
