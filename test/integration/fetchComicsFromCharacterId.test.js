import api from '../../src/integration/marvelApi';
import fetchComicsFromCharacterId from '../../src/integration/collectMarvelApiDataService/fetchComicsFromCharacterId.js';

jest.mock('../../src/integration/marvelApi');

describe('fetchComicsFromCharacterId', () => {
  it('fetches comics from characterId successfully', async () => {
    const mockComics = [
      {
        id: 1,
        name: 'Comic 1',
      },
    ];
    api.get.mockResolvedValue({ data: { results: mockComics } });

    const characterId = 1;
    const result = await fetchComicsFromCharacterId(api, characterId);

    expect(api.get).toHaveBeenCalledWith(`/characters/${characterId}/comics`);
    expect(result).toEqual(mockComics);
  });

  it('returns null if there is an error', async () => {
    const mockError = new Error('Failed to fetch characters');
    api.get.mockRejectedValue(mockError);

    const characterId = 1;
    const result = await fetchComicsFromCharacterId(api, characterId);

    expect(api.get).toHaveBeenCalledWith(`/characters/${characterId}/comics`);
    expect(result).toBeNull();
  });

  it('returns empty list if empty list is retrieved by the api', async () => {
    api.get.mockResolvedValue({ data: { results: [] } });

    const characterId = 1;
    const result = await fetchComicsFromCharacterId(api, characterId);

    expect(api.get).toHaveBeenCalledWith(`/characters/${characterId}/comics`);
    expect(result).toEqual([]);
  });
});
