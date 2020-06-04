const logger = require('../../utils/logger');
const utils = require('../../utils/writer');
const { task,comment,user } = require('../../models');
var sequelize = require('sequelize');
const CONSTANTS = require('../../constants/constant');
const{OPERTION_TYPE} = CONSTANTS

const listTask = function (status) {
       return task.findAll({ where: { status: status } },{ raw: true })
  }

const taskCount = function () {
    return task.findAll({
        attributes: ['status', [sequelize.fn('COUNT', sequelize.col('id')), 'taskCount']], 
        group: ["status"]
      },{ raw: true })
}

const addTask = async function (summary,description,created_by,taskId,parent_task) {
    console.log(summary)
    parent_task =0;
   let recId = "";
    await task.create({
        task_id: `Task-${taskId}`,
        summary:`${summary}`,
        description:`${description}`,
        created_by : `${created_by}`,
        assignee: `${created_by}`,
        parent_id: `${parent_task}`,
      }).then(function (res) {
          if (res) {
              logger.debug("Task Creation | Success inserting task - ID -- " + res.id);
              recId = res.id;
          } else {
              logger.error("Task Creation | Error inserting task!!!!!");
          }
      }).catch(function (err) {
           console.log(err)   
           });
    if ("" === recId){
        return(JSON.stringify({'status':'Failure'}));
    }else{
        return(JSON.stringify({'task_id':recId}));
    }
}
  
const getLastTaskId = function () {
    return task.findOne({
        attributes: ['id'],
        order: [ [ 'id', 'DESC' ]],
    },{ raw: true });
}

const addComment = async function (task_id,user_id,content) {
    let recId = "";
    await comment.create({
        user_id: `${user_id}`,
        task_id: `${task_id}`,
        content : `${content}`,
      }).then(function (res) {
          if (res) {
              logger.debug("Comment Creation | Success inserting Comment - ID -- " + res.id);
              recId = res.id;
          } else {
              logger.error("Comment Creation | Error inserting Comment!!!!!");
          }
      }).catch(function (err) {
           console.log(err)   
           });
    if ("" === recId){
        return(JSON.stringify({'status':'Failure'}));
    }else{
        return(JSON.stringify({'task_id':recId}));
    }
}

const listComment = async function (task_id) {
    console.log(task_id)
    try{
    return comment.findAll({ where: { task_id: task_id } },{ raw: true })

    }catch(e){
        console.log(e)
    }
}

const closeTask = async function (task_id) {
    try{ 
        return task.update(
              {status:OPERTION_TYPE.TASK_CLOSE},
              {
              where: {
                id: task_id,
              },
            },
          );
    }catch(e){
        console.log(e)
    }   
}
module.exports = {
    listTask,
    taskCount,
    addTask,
    getLastTaskId,
    addComment,
    listComment,
    closeTask
 };