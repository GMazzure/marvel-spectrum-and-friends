const models = (sequelize, DataTypes) => {
  const MarvelCharacter = sequelize.define('marvel_character', {
    character_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    avatar_url: DataTypes.STRING,
  });

  return { MarvelCharacter };
};

export default models;
