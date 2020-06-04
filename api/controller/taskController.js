const logger = require('../../utils/logger');
const utils = require('../../utils/writer');
const CONSTANTS = require('../../constants/constant');

const { task } = require('../../models');
const taskBusiness = require('../businesslayer/taskBusiness');
const { FEATURE_CONFIG, STATUS_CODE } = CONSTANTS

const addTask = async (req, res) => {
    if (FEATURE_CONFIG.TASK.CREATE) {
        let recId = "";
        const { summary, description, created_by, parent_task } = req.payload;
        await taskBusiness.addTask(summary, description, created_by, parent_task).then(function (response) {
            recId = response
        })
        task_id = JSON.parse(recId).task_id;
        if ("" === recId) {
            return (JSON.stringify({ 'status': 'Failure', statusCode: STATUS_CODE.FAILURE }));
        } else {
            return (JSON.stringify({ 'status': 'Success', statusCode: STATUS_CODE.SUCCESS, 'task_id': task_id }));
        }
    } else {
        return (JSON.stringify({ 'status': 'Failure', statusCode: STATUS_CODE.API_DISABLED }));

    }

}

const closeTask = async (req, res) => {
    if (FEATURE_CONFIG.TASK.CREATE) {
        let recId = "";
        const { task_id, type } = req.payload;
        console.log(task_id);
        await taskBusiness.closeTask(task_id).then(function (response) {
            recId = response
        })

        let deleted_task_id = 'Task-' + recId[0];

        if ("" === recId) {
            return (JSON.stringify({ 'status': 'Failure', statusCode: STATUS_CODE.FAILURE }));
        } else {
            return (JSON.stringify({ 'status': 'Success', statusCode: STATUS_CODE.SUCCESS, 'task_id': deleted_task_id }));
        }
    } else {
        return (JSON.stringify({ 'status': 'Failure', statusCode: STATUS_CODE.API_DISABLED }));

    }
}

const taskCount = async (req, res) => {
    let resp;
    await taskBusiness.taskCount().then(function (response) {
        resp = response
    })
    return ({ 'status': 'Success', data: resp });
}

const listTask = async (req, res) => {
    let resp;
    let { status } = req.params;
    await taskBusiness.listTask(status).then(function (response) {
        resp = response
    })
    return ({ 'status': 'Success', data: resp });

}

const addComment = async (req, res) => {
    if (FEATURE_CONFIG.TASK.CREATE) {
        let recId = "";
        const { task_id, user_id, comment } = req.payload;

        await taskBusiness.addComment(task_id, user_id, comment).then(function (response) {
            recId = response
        })
        comment_id = JSON.parse(recId).comment_id;
        if ("" === recId) {
            return (JSON.stringify({ 'status': 'Failure', statusCode: STATUS_CODE.FAILURE }));
        } else {
            return (JSON.stringify({ 'status': 'Success', statusCode: STATUS_CODE.SUCCESS, 'comment_id': comment_id }));
        }
    } else {
        return (JSON.stringify({ 'status': 'Failure', statusCode: STATUS_CODE.API_DISABLED }));

    }
}

const listComment = async (req, res) => {
    let resp;
    let { task_id } = req.params;
    await taskBusiness.listComment(task_id).then(function (response) {
        resp = response
    })
    return ({ 'status': 'Success', data: resp });

}
module.exports = {
    listTask,
    addTask,
    closeTask,
    taskCount,
    addComment,
    listComment
};