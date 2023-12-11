import getDistinctCharactersFromComicIdList from '../../src/integration/collectMarvelApiDataService/getDistinctCharactersFromComicIdList.js';
import fetchCharactersFromComicsId from '../../src/integration/collectMarvelApiDataService/fetchCharactersFromComicsId.js';
import axios from 'axios';

jest.mock('axios');
jest.mock('../../src/integration/collectMarvelApiDataService/fetchCharactersFromComicsId.js');

const mockApi = axios.create();

describe('getDistinctCharactersFromComicIdList', () => {
  it('returns an array of distinct characters from a list of comic ids', async () => {
    const comicIdList = [1, 2, 3];

    const characters = [
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
      {
        id: 3,
        name: 'Hulk',
        description: 'Test character',
        thumbnail: { path: 'test', extension: 'jpg' },
      },
    ];

    fetchCharactersFromComicsId.mockResolvedValue(characters);

    const result = await getDistinctCharactersFromComicIdList(mockApi, comicIdList);

    expect(result).toEqual([
      {
        id: 1,
        name: 'Spider-Man',
        description: 'Test character',
        thumbnail_url: 'test.jpg',
      },
      {
        id: 2,
        name: 'Iron Man',
        description: 'Test character',
        thumbnail_url: 'test.jpg',
      },
      {
        id: 3,
        name: 'Hulk',
        description: 'Test character',
        thumbnail_url: 'test.jpg',
      },
    ]);
  });

  it('returns an empty array when there are no comic ids', async () => {
    const comicIdList = [];

    const result = await getDistinctCharactersFromComicIdList(mockApi, comicIdList);

    expect(result).toEqual([]);
  });

  it('filters out duplicate characters from a list of comic ids', async () => {
    const comicIdList = [1, 2, 3];

    const characters = [
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
      {
        id: 1,
        name: 'Spider-Man',
        description: 'Test character',
        thumbnail: { path: 'test', extension: 'jpg' },
      },
    ];

    fetchCharactersFromComicsId.mockResolvedValue(characters);

    const result = await getDistinctCharactersFromComicIdList(mockApi, comicIdList);

    expect(result).toEqual([
      {
        id: 1,
        name: 'Spider-Man',
        description: 'Test character',
        thumbnail_url: 'test.jpg',
      },
      {
        id: 2,
        name: 'Iron Man',
        description: 'Test character',
        thumbnail_url: 'test.jpg',
      },
    ]);
  });
});
