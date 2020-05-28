module.exports = (sequelize, DataTypes) => {
    const session = sequelize.define('session', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      user_id: DataTypes.STRING,
      gauth_token: DataTypes.STRING,
      jwt_token: DataTypes.STRING,
    });
  
    return session;
  };
  