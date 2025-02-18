module.exports = (sequelize, DataTypes) => {
    const Train = sequelize.define('Train', {
      name: DataTypes.STRING,
      source: DataTypes.STRING,
      destination: DataTypes.STRING,
      totalSeats: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
    });
  
    return Train;
  };