module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      user_email: DataTypes.STRING,
      user_role: DataTypes.STRING,
    });
  
    return user;
  };
  