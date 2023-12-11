import getKnownCharactersByCharacterId from '../../src/integration/collectMarvelApiDataService/getKnownCharactersByCharacterId.js';
import collectMarvelApiDataService from '../../src/integration/collectMarvelApiDataService/index.js';

const mockedCharacterList = [
  {
    id: 1,
    name: 'Spider-Man',
    description: 'Test character',
    thumbnail: { path: 'test', extension: 'jpg' },
  },
  {
    id: 2,
    name: 'Iron Man',
    description: 'Test character',
    thumbnail: { path: 'test', extension: 'jpg' },
  },
];

jest.mock('../../src/integration/collectMarvelApiDataService/getKnownCharactersByCharacterId.js');

describe('collectMarvelApiDataService', () => {
  let mockCreateMarvelCharacter;

  beforeEach(() => {
    mockCreateMarvelCharacter = jest.fn();
  });

  it('should return a response for each character in the list', async () => {
    getKnownCharactersByCharacterId.mockResolvedValue(mockedCharacterList);

    const response = await collectMarvelApiDataService(null, {
      createMarvelCharacter: mockCreateMarvelCharacter,
    });

    expect(response.length).toBe(mockedCharacterList.length);
    expect(mockCreateMarvelCharacter).toHaveBeenCalledTimes(mockedCharacterList.length);
  });

  it('should return an error if the API request fails', async () => {
    const errorMessage = 'Error fetching characters from Marvel API';
    getKnownCharactersByCharacterId.mockRejectedValue(new Error(errorMessage));

    try {
      await collectMarvelApiDataService(null, { createMarvelCharacter: mockCreateMarvelCharacter });
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });
});
