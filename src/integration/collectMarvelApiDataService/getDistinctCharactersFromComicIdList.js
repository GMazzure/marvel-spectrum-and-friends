import fetchCharactersFromComicsId from './fetchCharactersFromComicsId.js';

const getDistinctCharactersFromComicList = async (api, comicIdList) => {
  /**
   * Receives a list of comics, fetches the characters present on all of them and returns
   * a list of distinct objects of marvel characters
   * @param {AxiosInstance} api - Axios instance to Marvel Api
   * @param {Array<Integer>} comicIdList - list of comicIds
   * @return {Object[]} List of distinct marvel characters
   */
  if (!comicIdList || comicIdList.length == 0) return [];
  try {
    const results = await Promise.all(
      comicIdList.map((comicId) => {
        return fetchCharactersFromComicsId(api, comicId);
      })
    );

    var characters = [];
    var characterIds = [];
    results.forEach((result) => {
      result.forEach((character) => {
        if (!characterIds.includes(character.id)) {
          characters.push({
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail_url: character.thumbnail.path + '.' + character.thumbnail.extension,
          });
          characterIds.push(character.id);
        }
      });
    });

    return characters;
  } catch (error) {
    console.log(`Error getting distinct characters\n ${error.message}`);
    return null;
  }
};

export default getDistinctCharactersFromComicList;
