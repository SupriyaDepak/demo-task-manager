const logger = require('../../utils/logger');
const utils = require('../../utils/writer');
const { task } = require('../../models');
const addTask = (req, res) => {

    task.create({
        task_id: 'Task-1',
        summary:`${req.payload.summary}`,
        description:`${req.payload.description}`,
        created_by : `${req.payload.created_by}`,
        assignee: `${req.payload.created_by}`,
      }).then(function (res) {
          if (res) {
              logger.debug("Task Creation | Success inserting task - ID -- " + res.id);
          } else {
              logger.error("Task Creation | Error inserting task!!!!!");
          }
      });

    return(JSON.stringify({"status":"Success", "task_id":res.id}));
}

const closeTask = (req, res) => {
}

const listTasks = (req, res) => {
}

module.exports = {
    listTasks,
    addTask,
    closeTask
  };