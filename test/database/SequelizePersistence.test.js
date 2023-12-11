const { Sequelize } = require('sequelize');
import SequelizePersistence from './../../src/database/SequelizePersistence.js';

describe('SequelizePersistence', () => {
  let sequelizePersistence;
  let mockedSequelize;

  beforeEach(async () => {
    mockedSequelize = new Sequelize('sqlite::memory:');
    sequelizePersistence = new SequelizePersistence(mockedSequelize);
    await sequelizePersistence.syncDatabase();
  });

  afterEach(async () => {
    await mockedSequelize.close();
  });

  it('should create a Marvel Character', async () => {
    const character_id = 1;
    const name = 'Spider-Man';
    const description = 'Peter Parker';
    const thumbnail_url = 'http://i.annihil.us/u/prod/marvel/i/mg/9/80/535fecba5d79.jpg';

    const result = await sequelizePersistence.createMarvelCharacter(
      character_id,
      name,
      description,
      thumbnail_url
    );

    expect(result).toEqual({
      character_id,
      name,
      description,
      thumbnail_url,
    });

    const createdCharacter = await mockedSequelize.models.MarvelCharacter.findOne({
      where: { character_id },
    });
    expect(createdCharacter).toBeDefined();
    expect(createdCharacter.name).toEqual(name);
    expect(createdCharacter.character_id).toEqual(character_id);
    expect(createdCharacter.description).toEqual(description);
    expect(createdCharacter.thumbnail_url).toEqual(thumbnail_url);
  });
});
