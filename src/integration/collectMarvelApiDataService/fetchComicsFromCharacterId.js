const fetchComicsFromCharacterId = async (api, characterId = 1010705) => {
  /**
   * Receives a Marvel CharacterId and returns a list of comics the character participated
   * @param {AxiosInstance} api - Axios instance to Marvel Api
   * @param {Integer} characterId - character id
   * @return {Object[]} List of comic objects
   */

  try {
    const response = await api.get(`/characters/${characterId}/comics`);
    return response.data?.results;
  } catch (error) {
    console.log(`Error fetching comics from characterId ${characterId}\n ${error.message}`);
    return null;
  }
};

export default fetchComicsFromCharacterId;
