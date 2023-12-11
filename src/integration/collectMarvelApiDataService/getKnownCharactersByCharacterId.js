import fetchComicsFromCharacterId from './fetchComicsFromCharacterId.js';
import getDistinctCharactersFromComicIdList from './getDistinctCharactersFromComicIdList.js';

const getKnownCharactersByCharacterId = async (api, characterId = 1010705) => {
  /**
   * Receives a CharacterId, and tries to fetch every character that co-participated on any of his
   * comics
   * @param {AxiosInstance} api - Axios instance to Marvel Api
   * @param {Integer} characterId - Marvel character id
   * @return {Object[]} List Marvel characters
   */
  try {
    const comicsByCharacterId = await fetchComicsFromCharacterId(api, characterId);
    if (!comicsByCharacterId || comicsByCharacterId.length === 0) return [];

    const comicIdsByCharacterId = comicsByCharacterId.map((comic) => comic.id);

    const knownCharactersByCharacterId = await getDistinctCharactersFromComicIdList(
      api,
      comicIdsByCharacterId
    );

    if (!knownCharactersByCharacterId) return [];

    return knownCharactersByCharacterId;
  } catch (error) {
    console.log(`Error fetching known characters by characterId ${characterId}\n ${error.message}`);
    return null;
  }
};

export default getKnownCharactersByCharacterId;
