const fetchCharactersFromComicsId = async (api, comicId) => {
  /**
   * Receives a comicId, then fetches all Marvel characters that were present on that comic
   * @param {AxiosInstance} api - Axios instance to Marvel Api
   * @param {Integer} comicId - comic id
   * @return {Object[]} list of Marvel characters
   */
  try {
    const response = await api.get(`/comics/${comicId}/characters`);

    return response.data?.results;
  } catch (error) {
    console.log(`Error fetching characters from comicId ${comicId}\n ${error.message}`);
    return null;
  }
};

export default fetchCharactersFromComicsId;
