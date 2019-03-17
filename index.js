require('dotenv').config();
const log = require('loglevel');

log.setLevel('info');

const server = require('./server');

const port = process.env.PORT || 3001;

server().listen(port, () => log.info(`Live on port: ${port}!`));
