import Sequelize from 'sequelize';
import path from 'path'
import fs from 'fs'

const sequelize = new Sequelize('slack', 'root', 'root', {
  dialect: 'postgres',
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

console.log('db: ', db)

Object.keys(db).forEach(modelName => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;



module.exports = db;










// console.log('uu->', require(path.join(__dirname, './user'))(sequelize, Sequelize))
// const models = {
//   User: sequelize.import(__dirname + './user'),
//   Channel: sequelize.import(__dirname + './channel'),
//   Message: sequelize.import(__dirname + './message'),
//   Team: sequelize.import(__dirname + './team'),
// };

// Object.keys(models).forEach((modelName) => {
//   if ('associate' in models[modelName]) {
//     models[modelName].associate(models);
//   }
// });

// models.sequelize = sequelize;
// models.Sequelize = Sequelize;

// export default models;