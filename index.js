require('dotenv').config();
const log=require('loglevel');
log.setLevel('info');

const server = require('./server');
const port = process.env.PORT || 3001;

server().listen(port, function () {
	console.log(`Live on port: ${port}!`);
});

