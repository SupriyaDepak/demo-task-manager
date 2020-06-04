/**
 * Basic server with Hapi
 * @author : vgk
 * 
 */
'use strict';

const Hapi = require('@hapi/hapi');
const cors = require('cors');
const logger = require('./utils/logger');
const db = require('./models/index');

const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
// ref https://github.com/dwyl/hapi-auth-jwt2
const JWT = require('hapi-auth-jwt2');
const Pack = require('./package');
const Joi = require('@hapi/joi');
const taskController = require('./api/controller/taskController');
const key = require('./config/envConfig')
const createToken = require('./utils/createToken');
const validate = require('./utils/validateToken');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: Pack.version,
        },
    };

    await server.register([
        JWT,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    // server.auth.strategy('jwt', 'jwt',
    //     {
    //         key: key, // Never Share your secret key
    //         validate: validate,  // validate function defined above
    //         verifyOptions: {
    //             //ignoreExpiration: true,    // do not reject expired tokens
    //             algorithms: ['HS256']    // specify your secure algorithm
    //         }
    //     });
    //server.auth.default('jwt');

    server.route({
        method: 'GET',
        path: '/',
        //config: { auth: 'jwt' },
        handler: (request, h) => {
            return 'Hello World!';
        }
    });
    server.route({
        method: 'GET',
        path: '/test/{id}',
        options: {
            description: 'Mirror ID',
            notes: 'Returns a number passed in the path',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().required().description('Any Number'),
                }),
            }
        },
        handler: function (request, reply) {
            return ('Hello, you entered : ' + encodeURIComponent(request.params.id) + '!');
        },
    });
    server.route({
        method: "GET",
        path: "/task/list/{status}",
        options: {
            description: 'List the Tasks',
            notes: 'Returns a list of tasks',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    status: Joi.string().required().description('List task accepts value as "open" or "closed"'),
                }),
            }

        },
        handler: taskController.listTask

    });
    server.route({
        method: "GET",
        path: "/task/{parent_task}/listsubtask/{status}",
        options: {
            description: 'List the Subtasks',
            notes: 'Returns a list of Subtasks',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    parent_task: Joi.number().required().description('Parent Task id'),
                    status: Joi.string().required().description('List task accepts value as "open" or "closed"'),
                }),
            }

        },
        handler: taskController.listSubTask

    });
    server.route({
        method: "GET",
        path: "/task/taskcount",
        options: {
            description: 'List the Tasks',
            notes: 'Returns a list of tasks',
            tags: ['api']
        },
        handler: taskController.taskCount

    });
    server.route({
        method: "POST",
        path: "/task/add",
        options: {
            description: 'Add a Task',
            notes: 'Add a new task',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    parent_task: Joi.number().description('parent task id'),
                    summary: Joi.string().required().description('Task Summary'),
                    // priority: Joi.string().required().description('Task priority'),
                    // dueDate: Joi.date().timestamp('javascript').required().description('Task dueDate'),
                    description: Joi.string().required().description('Task Description'),
                    created_by: Joi.number().required().description('Creator User ID')
                })
            }
        },
        handler: taskController.addTask
        //(request, response) => {            response(request.payload);        }
    });
    server.route({
        method: "POST",
        path: "/comment/add",
        options: {
            description: 'Add a comment',
            notes: 'Add a new comment',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    task_id: Joi.number().required().description('Task id'),
                    user_id: Joi.number().required().description('user id'),
                    comment: Joi.string().required().description('comment'),
                })
            }
        },
        handler: taskController.addComment
        //(request, response) => {            response(request.payload);        }
    });
    server.route({
        method: "POST",
        path: "/task/close",
        options: {
            description: 'close task and sub-task',
            notes: 'close task and sub-task',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    task_id: Joi.number().required().description('Task id')
                })
            }
        },
        handler: taskController.closeTask
        //(request, response) => {            response(request.payload);        }
    });
    server.route({
        method: "GET",
        path: "/comment/list/{task_id}",
        options: {
            description: 'List the comments for particular task',
            notes: 'Returns a list of comments',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    task_id: Joi.number().required().description('task id'),
                }),
            }

        },
        handler: taskController.listComment

    });
    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch (err) {
        console.log(err);
    }
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();

//console.log(createToken(0,'nasdlijadlkijasdoijasdoijasdoijasd'));