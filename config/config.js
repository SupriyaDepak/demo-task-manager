const config = {
    development: {
      database: 'demo_task_manager',
      username: 'postgres',
      password: 'root',
      host: 'localhost',
      dialect: 'postgres'
    },
    staging: {
      database: 'demo_task_manager',
      username: 'postgres',
      password: 'root@123',
      host: '10.220.48.3',
      dialect: 'postgres',
    },
  
  };
  
  const environment = process.env.NODE_ENV || 'development';
  const dbConfig = config[environment];
  
  
  module.exports = dbConfig;
  