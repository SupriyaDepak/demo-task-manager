module.exports = (sequelize, DataTypes) => {
    const task = sequelize.define('task', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      task_id: DataTypes.STRING,
      parent_id: DataTypes.STRING,
      summary: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.STRING,
      created_by:DataTypes.STRING,
      assignee:DataTypes.STRING,
      comment: DataTypes.STRING,
      due_date: DataTypes.DATE
    }, {
        freezeTableName: true
    }
    );
  
    return task;
  };
  