import api from '../../src/integration/marvelApi';
import fetchCharactersFromComicsId from '../../src/integration/collectMarvelApiDataService/fetchCharactersFromComicsId.js';

jest.mock('../../src/integration/marvelApi');

describe('fetchCharactersFromComicsId', () => {
  it('fetches characters successfully', async () => {
    const mockCharacters = [
      {
        id: 1,
        name: 'Character 1',
        description: '',
        thumbnail: { path: 'a', extension: 'b' },
      },
    ];
    api.get.mockResolvedValue({ data: { results: mockCharacters } });

    const comicId = 1;
    const result = await fetchCharactersFromComicsId(api, comicId);

    expect(api.get).toHaveBeenCalledWith(`/comics/${comicId}/characters`);
    expect(result).toEqual(mockCharacters);
  });

  it('returns null if there is an error', async () => {
    const mockError = new Error('Failed to fetch characters');
    api.get.mockRejectedValue(mockError);

    const comicId = 1;
    const result = await fetchCharactersFromComicsId(api, comicId);

    expect(api.get).toHaveBeenCalledWith(`/comics/${comicId}/characters`);
    expect(result).toBeNull();
  });

  it('returns empty list if empty list is retrieved by the api', async () => {
    api.get.mockResolvedValue({ data: { results: [] } });

    const comicId = 1;
    const result = await fetchCharactersFromComicsId(api, comicId);

    expect(api.get).toHaveBeenCalledWith(`/comics/${comicId}/characters`);
    expect(result).toEqual([]);
  });
});
