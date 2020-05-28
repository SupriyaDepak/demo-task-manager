const bunyan = require('bunyan');
const { LoggingBunyan } = require('@google-cloud/logging-bunyan');

const loggingBunyan = new LoggingBunyan();

const logger = bunyan.createLogger({
  // The JSON payload of the log as it appears in Stackdriver Logging
  // will contain "name": "demo-task-manager"
  name: 'demo-task-manager',
  streams: [
    // Log to the console at 'info' and above
    { stream: process.stdout, level: 'debug' },
    // And log to Stackdriver Logging, logging at 'info' and above
    loggingBunyan.stream('debug'),
  ],
});

module.exports = logger;
