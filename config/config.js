const config = {
    development: {
      database: 'demo_task_manager',
      username: 'postgres',
      password: 'root',
      host: 'localhost',
      dialect: 'postgres'
    },
    staging: {
      database: 'pg_demo_task_manager',
      username: '',
      password: '',
      host: '35.238.115.191',
      dialect: 'postgres',
    },
  
  };
  
  const environment = process.env.NODE_ENV || 'staging';
  const dbConfig = config[environment];
  
  
  module.exports = dbConfig;
  