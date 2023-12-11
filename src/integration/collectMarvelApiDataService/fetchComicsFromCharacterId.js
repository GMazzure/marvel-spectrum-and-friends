const fetchComicsFromCharacterId = async (api, characterId = 1010705) => {
  try {
    const response = await api.get(`/characters/${characterId}/comics`);
    return response.data?.results;
  } catch (error) {
    console.log(`Error fetching comics from characterId ${characterId}\n ${error.message}`);
    return null;
  }
};

export default fetchComicsFromCharacterId;
