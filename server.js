"use strict";
const HandlePromiseError = require('./src/lib/HandlePromiseError');
const ExpressErrorMiddleware = require('./src/lib/ExpressErrorMiddleware');
const express = require("express");
var cors = require('cors')
const server = function () {

	const app = express()
	//Body parser
	app.use(express.json())

	/////////////////////////////
	//
	//CORS For all ORIGINS!!!!!!	
	//
	/////////////////////////////
	app.use(cors())
  app.enable('trust proxy'); //Allows correct protocol to be used when constructing URI's.

	app.get('/', function (req, res) {
		res.send(JSON.stringify(
			{ 
				api: {
				 title: 'Scaffold API',
         resources:{
          customers: {
            href: "/api/customers",
            description: "Customer data"
          }
         }
        }
      }
    ))
	});

	//Unauthenticated routes
	app.get('/customers/', (req, res)=>{res.send("OK!")})

	//Error handler
	app.use(ExpressErrorMiddleware);
	return app;	
};

module.exports = server;