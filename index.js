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
const Pack = require('./package');
const Joi = require('@hapi/joi');
const taskController = require('./api/controller/taskController');

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
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    server.route({
        method: 'GET',
        path: '/',
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
            return('Hello, you entered : ' + encodeURIComponent(request.params.id) + '!');
        },
    });
    server.route({
        method: "GET",
        path: "/task/list",
        options: {
            description: 'List the Tasks',
            notes: 'Returns a list of tasks',
            tags: ['api']
        },
        handler: (request, response) => {
            response(request.payload);
        }
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
                    summary: Joi.string().required().description('Task Summary'),
                    description: Joi.string().required().description('Task Description'),
                    created_by:Joi.number().required().description('Creator User ID')
                })
            }
        },
        handler: taskController.addTask
        //(request, response) => {            response(request.payload);        }
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