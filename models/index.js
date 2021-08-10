import Sequelize from 'sequelize';
import path from 'path'
import fs from 'fs'

const sequelize = new Sequelize('slack', 'root', 'root', {
  dialect: 'postgres',
  define: {
    underscored: true
  },
  logging: console.log
});

const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf(".") !== 0) && (file !== "index.js") && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;


module.exports = db;