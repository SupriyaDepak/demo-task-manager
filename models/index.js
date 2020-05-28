const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const logger = require('../utils/logger');
const dbConfig = require('../config/config');

const basename = path.basename(__filename);

const db = {};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  { 
    host: dbConfig.host, 
    dialect: dbConfig.dialect,
    useUTC: false,
    timezone: '+05:30' // To be updated to whatever TZ
  },
);

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch((err) => {
    logger.error('Error occured while connecting to database ...!');
    logger.error(err);
  });


["task.js","user.js","session.js"]
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;