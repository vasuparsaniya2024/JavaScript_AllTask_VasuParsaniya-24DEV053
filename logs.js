require('dotenv').config();
const pino = require('pino');
// const pinoPretty = require('pino-pretty');

const logfile = `${__dirname}/logsfile.log`;

const transport = pino.transport({
  targets: [
    {
      target: 'pino-pretty',
      options: {destination: logfile, colorize: false}
    },
    {
      target: 'pino-pretty',
      options: {destination : process.stdout.fd}
    }
  ]
});

const logger = pino({
  level: process.env.LOG_LEVEL
},transport);

module.exports = logger

// Log errors including the file where the error occurs
//logError is property of logger function
module.exports.logError = function(err) {
  const error = err instanceof Error ? err : new Error(err);
  const stack = error.stack.split('\n');
  const callerStackLine = stack[2]; // Extract the line of the stack trace where the logging function is called
  const fileMatch = callerStackLine.match(/\(([^)]+)\)/); // Extract the file name from the stack trace
  const fileName = fileMatch ? fileMatch[1] : 'Unknown file'; // Get the file name or use a default value if not found

  // console.log(callerStackLine);
  logger.error({ file: fileName, error: error.message });  //error.name, error.stack
};