const logger = require('../../utils/logger');
const utils = require('../../utils/writer');
const { task, comment, user } = require('../../models');
var sequelize = require('sequelize');
const CONSTANTS = require('../../constants/constant');
const { OPERTION_TYPE } = CONSTANTS
var db  = require('../../models/index').db;

const listTask = async function (status) {
    try{
    let result = '';
    query = `select t.id,task_id,t.summary,t.description,u.user_name as created_by,u2.user_name as assignee from task t left outer join users u on t.assignee = u.id left outer join users u2 on t.created_by = u2.id where t.status ='${status}' and parent_id=0`
   await db.sequelize.query(query).spread((results, metadata) => {
        // Results will be an empty array and metadata will contain the number of affected rows.
        result =results;
    });
    return result;
}catch(e){
    console.log(e);
    return '';
}
}

const listSubTask = async function (parent_task, status) {
    try{
    query = `select t.id,task_id,t.summary,t.description,u.user_name as created_by,u2.user_name as assignee from task t left outer join users u on t.assignee = u.id left outer join users u2 on t.created_by = u2.id where t.status ='${status}' and parent_id=${parent_task}`
    await db.sequelize.query(query).spread((results, metadata) => {
        // Results will be an empty array and metadata will contain the number of affected rows.
        result =results;
    });
    return result;   
}catch(e){
        console.log(e);
        return '';


    }
}

const taskCount = function () {
    try{
    return task.findAll({
        where: {
            parent_id: {
              [Op.or]: [0,null]
            }
          },
        attributes: ['status', [sequelize.fn('COUNT', sequelize.col('id')), 'taskCount']], 
        group: ["status"]
      },{ raw: true }).catch((error) => error);
    }catch(e){
        console.log(e)
    }
}

const subTaskCount = function (task_id) {
    try{
    return task.findAll({
        where: {
            parent_id: task_id
          },
        attributes: ['status', [sequelize.fn('COUNT', sequelize.col('id')), 'taskCount']], 
        group: ["status"]
      },{ raw: true }).catch((error) => error);
    }catch(e){
        console.log(e)
    }
}

const addTask = async function (summary, description, created_by, taskId, parent_task) {
    console.log(summary)
    //parent_task =0;
    let recId = "";
    await task.create({
        task_id: `Task-${taskId}`,
        summary: `${summary}`,
        description: `${description}`,
        created_by: `${created_by}`,
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
    if ("" === recId) {
        return (JSON.stringify({ 'status': 'Failure' }));
    } else {
        return (JSON.stringify({ 'task_id': recId }));
    }
}

const getLastTaskId = function () {
    return task.findOne({
        attributes: ['id'],
        order: [['id', 'DESC']],
    }, { raw: true });
}

const addComment = async function (task_id, user_id, content) {
    let recId = "";
    await comment.create({
        user_id: `${user_id}`,
        task_id: `${task_id}`,
        content: `${content}`,
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
    if ("" === recId) {
        return (JSON.stringify({ 'status': 'Failure' }));
    } else {
        return (JSON.stringify({ 'comment_id': recId }));
    }
}

const listComment = async function (task_id) {
    console.log(task_id)
    try {
        return comment.findAll({ where: { task_id: task_id } }, { raw: true })

    } catch (e) {
        console.log(e)
    }
}

const closeTask = async function (task_id) {
    try {
        return task.update(
            { status: OPERTION_TYPE.TASK_CLOSE },
            {
                where: {
                    id: task_id,
                },
            },
        );
    } catch (e) {
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
    closeTask,
    listSubTask,
    subTaskCount
};