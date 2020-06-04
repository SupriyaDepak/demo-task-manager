const user = require('./user')
module.exports = (sequelize, DataTypes) => {
    const comment = sequelize.define('comment', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      task_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      content: DataTypes.STRING,
      

      
    }, {
        freezeTableName: true
    }
    
    );

    return comment;
  };
  