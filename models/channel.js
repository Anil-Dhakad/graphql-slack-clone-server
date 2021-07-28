module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    name: DataTypes.STRING,
    public: DataTypes.BOOLEAN,
  }, { underscored: true });

  Channel.associate = (models) => {
    console.log(models)
    Channel.belongsTo(models.Team, {
      foreignKey: {
        name: 'teamId',
        field: 'team_id'
      }
    });
  };

  return Channel;
};