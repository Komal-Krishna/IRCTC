const { Sequelize } = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
});

const db = {
  sequelize,
  Sequelize,
  User: require('./user')(sequelize, Sequelize),
  Train: require('./train')(sequelize, Sequelize),
  Booking: require('./booking')(sequelize, Sequelize),
};

// Define associations
db.Train.hasMany(db.Booking, { foreignKey: 'trainId' });
db.Booking.belongsTo(db.Train, { foreignKey: 'trainId' });

db.User.hasMany(db.Booking, { foreignKey: 'userId' });
db.Booking.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;