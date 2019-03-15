require('dotenv').config();
const checkEnv = require('check-env');

const required = [
  'LOG_LEVEL', // https://www.npmjs.com/package/loglevel
];
checkEnv(required);
