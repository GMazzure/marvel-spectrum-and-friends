import getKnownCharactersByCharacterId from '../../src/integration/collectMarvelApiDataService/getKnownCharactersByCharacterId.js';
import fetchComicsFromCharacterId from '../../src/integration/collectMarvelApiDataService/fetchComicsFromCharacterId.js';
import getDistinctCharactersFromComicIdList from '../../src/integration/collectMarvelApiDataService/getDistinctCharactersFromComicIdList.js';

jest.mock('../../src/integration/collectMarvelApiDataService/fetchComicsFromCharacterId.js');
jest.mock(
  '../../src/integration/collectMarvelApiDataService/getDistinctCharactersFromComicIdList.js'
);
const api = null;
const characterId = 1010705;

describe('getKnownCharactersByCharacterId', () => {
  it('returns an empty array if there are no comics by the given characterId', async () => {
    fetchComicsFromCharacterId.mockResolvedValue([]);

    const result = await getKnownCharactersByCharacterId(api, characterId);

    expect(result).toEqual([]);
  });

  it('returns an empty array if there are no distinct characters by the given comicIdList', async () => {
    fetchComicsFromCharacterId.mockResolvedValue([{ id: 12345 }]);
    getDistinctCharactersFromComicIdList.mockResolvedValue([]);

    const result = await getKnownCharactersByCharacterId(api, characterId);

    expect(result).toEqual([]);
  });

  it('returns characters by the given characterId', async () => {
    fetchComicsFromCharacterId.mockResolvedValue([{ id: 12345 }]);

    const mockedCharacters = [
      { id: 12345, name: 'Spectrum', description: 'Spectrum!!', thumbnail: 'spectrum.jpg' },
      { id: 67890, name: 'Iron Man', description: 'I am Iron Man!!', thumbnail: 'ironman.jpg' },
    ];
    getDistinctCharactersFromComicIdList.mockResolvedValue(mockedCharacters);

    const result = await getKnownCharactersByCharacterId(api, characterId);

    expect(result).toEqual(mockedCharacters);
  });

  it('throws an error if fetching known characters by characterId fails', async () => {
    fetchComicsFromCharacterId.mockRejectedValue(
      new Error('Failed to fetch comics by characterId')
    );

    try {
      await getKnownCharactersByCharacterId(api, characterId);
    } catch (error) {
      expect(error.message).toEqual('Failed to fetch comics by characterId');
    }
  });
});
