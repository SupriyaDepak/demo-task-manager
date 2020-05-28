module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define('role', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      role: DataTypes.STRING,
    });
  
    return role;
  };
  