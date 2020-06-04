const logger = require('../../utils/logger');
const utils = require('../../utils/writer');
const taskServices  = require('../services/taskServices');
const CONSTANTS = require('../../constants/constant');
const{OPERTION_TYPE} = CONSTANTS


const listTask = function(status) {
        return taskServices.listTask(status).then((taskList)=>{
            return taskList;
            
       })
    
}

const taskCount = function() {
    return taskServices.taskCount().then((taskCounts)=>{
        return taskCounts;
        
   })

}

const addTask = function(summary,description,created_by,parent_task) {
    return taskServices.getLastTaskId().then((taskId)=>{
        console.log(taskId.id)
        return taskServices.addTask(summary,description,created_by,taskId.id,parent_task).then((res)=>{
            return res;
            
       })        
   })

}

const addComment = function(task_id,user_id,comment) {
        return taskServices.addComment(task_id,user_id,comment).then((res)=>{
            console.log(res)
            return res;
              
   })

}

const listComment = function(task_id) {
    return taskServices.listComment(task_id).then((taskList)=>{
        console.log(taskList)

        return taskList;
        
   })

}
const closeTask = function(task_id) {
        return taskServices.closeTask(task_id).then((taskList)=>{
            console.log(taskList)
    
            return taskList;
            
       })
    }



module.exports = {
    listTask,
    taskCount,
    addTask,
    addComment,
    listComment,
    closeTask
 };