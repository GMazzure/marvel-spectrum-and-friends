import marvelCharactersControllerFactory from './../../src/controllers/marvelCharactersControllerFactory.js';
import MockedPersistence from '../database/mockedPersistence.js';


const characters = [
  { character_id: 1, name: 'Iron Man', description: '', thumbnail_url: '' },
  { character_id: 2, name: 'Spider-Man', description: '', thumbnail_url: '' },
];

describe('SequelizePersistence', () => {

  it('should return a list of Marvel Characters', async () => {
    const mockPersistence = new MockedPersistence(characters);
    const marvelCharactersController = marvelCharactersControllerFactory(mockPersistence);

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await marvelCharactersController.getMarvelCharacters({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: true,
      message: 'Marvel Characters fetched successfully',
      data: characters,
    });
  });

  it('should error message if no characters are retrieved', async () => {
    const mockPersistence = new MockedPersistence([]);
    const marvelCharactersController = marvelCharactersControllerFactory(mockPersistence);

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await marvelCharactersController.getMarvelCharacters({}, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'Failed to fetch marvel characters!',
      data: null,
    });
  });
});
