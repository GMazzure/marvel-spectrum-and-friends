const fetchCharactersFromComicsId = async (api, comicId) => {
  try {
    const response = await api.get(`/comics/${comicId}/characters`);
    // console.log(`/comics/${comicId}/characters`, response);

    return response.data?.results;
  } catch (error) {
    console.log(`Error fetching characters from comicId ${comicId}\n ${error.message}`);
    return null;
  }
};

export default fetchCharactersFromComicsId;
