const models = (sequelize, DataTypes) => {
  const MarvelCharacter = sequelize.define(
    'MarvelCharacter',
    {
      character_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      thumbnail_url: DataTypes.STRING,
    },
    {
      tableName: 'marvel_characters',
    }
  );

  console.log('uigual?', MarvelCharacter == sequelize.models.MarvelCharacter);
  return { MarvelCharacter };
};

export default models;
