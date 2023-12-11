const fetchCharactersFromComicsId = async (api, comicId) => {
  try {
    const response = await api.get(`/comics/${comicId}/characters`);

    return response.data?.results;
  } catch (error) {
    console.log(`Error fetching characters from comicId ${comicId}\n ${error.message}`);
    return null;
  }
};

export default fetchCharactersFromComicsId;
