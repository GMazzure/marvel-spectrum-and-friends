import IPersistance from './IPersistance.js';
import { Sequelize, DataTypes } from 'sequelize';
import models from './models.js';

class SequelizePersistence extends IPersistance {
  constructor(sequelize) {
    super();
    if (sequelize) {
      this.sequelize = sequelize;
    } else {
      this.sequelize = new Sequelize('sqlite:./database.db');
    }

    this.models = models(this.sequelize, DataTypes);
  }

  async syncDatabase() {
    await this.sequelize.sync();
  }

  async createMarvelCharacter(character_id, name, description, thumbnail_url) {
    const { MarvelCharacter } = this.models;

    // #TODO: Validate Marvel Character
    try {
      const marvelCharacter = await MarvelCharacter.create({
        character_id,
        name,
        description: description.trim().length > 0 ? description : null,
        thumbnail_url,
      });

      return {
        character_id: marvelCharacter.character_id,
        name: marvelCharacter.name,
        description: marvelCharacter.description,
        thumbnail_url: marvelCharacter.thumbnail_url,
      };
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        console.log(`Marvel Character ${name} is already created on database`);
      } else {
        throw err;
      }
    }
  }

  async getMarvelCharacters() {
    const { MarvelCharacter } = this.sequelize.models;
    const marvelCharacters = await MarvelCharacter.findAll();

    return marvelCharacters.map((character) => ({
      character_id: character.character_id,
      name: character.name,
      description: character.description,
      thumbnail_url: character.thumbnail_url,
    }));
  }
}

export default SequelizePersistence;
