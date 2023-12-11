import IPersistance from '../../src/database/IPersistance.js';

class MockedPersistence extends IPersistance {
  constructor(characterList) {
    super();
    this.characterList = characterList || [];
  }

  async syncDatabase() {
    return;
  }

  async createMarvelCharacter(character_id, name, description, thumbnail_url) {
    try {
      if (this.characterList.map((el) => el.character_id).includes(character_id))
        throw 'Character already registered';

      this.characterList.push({
        character_id: character_id,
        name: name,
        description: description,
        thumbnail_url: thumbnail_url,
      });

      return {
        character_id: character_id,
        name: name,
        description: description,
        thumbnail_url: thumbnail_url,
      };
    } catch (err) {
      console.log(`Marvel Character ${name} is already created on database`);
    }
  }

  async getMarvelCharacters() {
    return this.characterList.map((character) => ({
      character_id: character.character_id,
      name: character.name,
      description: character.description,
      thumbnail_url: character.thumbnail_url,
    }));
  }
}

export default MockedPersistence;
