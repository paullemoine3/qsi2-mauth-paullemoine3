const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const db = {};
const basename = path.basename(module.filename);

//const sequelize = new Sequelize(process.env.DATABASE_URL);
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_URL,
  dialect: 'postgres',
  pool: {
    idle: 30000,
    min: 0,
    max: 5
  }
});

fs.readdirSync(__dirname)
  .filter(
    file =>
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('triggers') === -1
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;