const CognitoExpress = require("cognito-express"); //Initializing CognitoExpress constructor
require('dotenv').config();
const log=require('loglevel');
log.setLevel('info');


const cognitoExpress = new CognitoExpress({
	region: process.env.AWS_REGION,
	cognitoUserPoolId: process.env.COGNITO_USERPOOLID,
	tokenUse: "id", //Possible Values: access | id
	tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
});

const server = require('./server')(cognitoExpress);
const port = process.env.PORT || 3001;

server.listen(port, function () {
	console.log(`Live on port: ${port}!`);
});

