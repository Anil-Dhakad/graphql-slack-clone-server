import Sequelize from 'sequelize';
import path from 'path'

const sequelize = new Sequelize('slack', 'root', 'root', {
  dialect: 'postgres',
});

const models = {
  User: require(path.join(__dirname, './user')),
  Channel: require(path.join(__dirname, './channel')),
  Message: require(path.join(__dirname, './message')),
  Team: require(path.join(__dirname, './team')),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;