require('dotenv').config();
const pino = require('pino');

const stream = pino.destination({
  dest: `${__dirname}/logsfile.log`
});

const logger = pino(stream);


module.exports = logger