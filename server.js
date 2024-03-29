'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const HandlePromiseError = require('./src/lib/HandlePromiseError');
const ExpressErrorMiddleware = require('./src/lib/ExpressErrorMiddleware');
const PeopleController = require('./src/controllers/PeopleController');
const CurrentUserController = require('./src/controllers/CurrentUserController');
require('dotenv').config();

const server = function server(checkJwt, checkScopes) {
  const app = express();

  // Body parser
  app.use(express.json());

  // ///////////////////////////
  //
  // CORS For all ORIGINS!!!!!!
  //
  // ///////////////////////////
  app.use(cors());
  app.use(morgan('API Request (port 3001): :method :url :status :response-time ms - :res[content-length]'));
  app.enable('trust proxy'); // Allows correct protocol to be used when constructing URI's.

  app.get('/api/public', (req, res) => {
    res.json({
      message:
        "Hello from a public endpoint! You don't need to be authenticated to see this.",
    });
  });

  app.get('/api/private', checkJwt, checkScopes, (req, res) => {
    res.json({
      message:
        'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.',
    });
  });

  app.get('/', (req, res) => {
    res.send(
      JSON.stringify({
        api: {
          title: 'Scaffold API',
          resources: {
            customers: {
              href: '/api/customers',
              description: 'Customer data',
            },
          },
        },
      }),
    );
  });
  app.get('/api/whoami', HandlePromiseError(CurrentUserController.show));
  app.get('/api/people/:user_uuid', PeopleController.show);
  app.get('/api/people', PeopleController.index);
  app.post('/api/people', PeopleController.create);

  // Error handler
  app.use(ExpressErrorMiddleware);
  return app;
};

module.exports = server;
