import IDatabase from './IDatabase.js';
import { Sequelize, DataTypes } from 'sequelize';
import models from './models.js';

class SequelizePersistence extends IDatabase {
  constructor() {
    super();
    this.sequelize = new Sequelize('sqlite:./database.db');
    models(this.sequelize, DataTypes);
    this.sequelize.sync();
  }

  async createMarvelCharacter(character_id, name, description, avatar_url) {
    const { MarvelCharacter } = this.sequelize.models;

    // #TODO: Validate Marvel Character
    const marvelCharacter = await MarvelCharacter.create({
      character_id,
      name,
      description,
      avatar_url,
    });

    return {
      character_id: marvelCharacter.character_id,
      name: marvelCharacter.name,
      description: marvelCharacter.description,
      avatar_url: marvelCharacter.avatar_url,
    };
  }

  async getMarvelCharacters() {
    const { MarvelCharacter } = this.sequelize.models;
    const marvelCharacters = await MarvelCharacter.findAll();

    return marvelCharacters.map((character) => ({
      character_id: character.character_id,
      name: character.name,
      description: character.description,
      avatar_url: character.avatar_url,
    }));
  }
}

export default new SequelizePersistence();
