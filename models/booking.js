module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
      userId: DataTypes.INTEGER,
      trainId: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM('confirmed', 'cancelled'),
        defaultValue: 'confirmed',
      },
    });
  
    return Booking;
  };