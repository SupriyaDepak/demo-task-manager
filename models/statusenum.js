module.exports = (sequelize, DataTypes) => {
    const status = sequelize.define('status', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      status: DataTypes.STRING,
    });
  
    return status;
  };
  