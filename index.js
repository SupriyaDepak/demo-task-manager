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
const { user, session } = require('./models');

const getUser = (user_id) => {
    return user.findOne({
        attributes: ['id', 'user_name', 'user_email'],
        where: {
            id: user_id.toString(),
        },
        raw: true,
    });
};

const getSession = (user_id) => {
    return session.findOne({
        attributes: ['user_id', 'gauth_token'],
        where: {
            user_id: user_id.toString(),
        },
        raw: true,
    });
};


// bring your own validation function
const validate = async function (decoded, request, h) {
    const { user_id, gauth_token, date, iat } = decoded;
    console.log(user_id, gauth_token, date, iat);
    //do your checks to see if the user is valid
    var validUser = false;
    await getSession(user_id).then((res) => {
        if (res) {
            console.log(res);
            //time check here
            validUser = true;
        }
    })
    if (true === validUser){
        return { isValid: true };
    }else {
        return { isValid: false };
    }
};

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

    server.auth.strategy('jwt', 'jwt',
        {
            key: key, // Never Share your secret key
            validate: validate,  // validate function defined above
            verifyOptions: {
                //ignoreExpiration: true,    // do not reject expired tokens
                algorithms: ['HS256']    // specify your secure algorithm
            }
        });
    server.auth.default('jwt');

    server.route({
        method: 'GET',
        path: '/',
        config: { auth: 'jwt' },
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
                    created_by: Joi.number().required().description('Creator User ID')
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

//console.log(createToken(0,'nasdlijadlkijasdoijasdoijasdoijasd'));