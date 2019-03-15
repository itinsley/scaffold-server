'use strict';

const express = require('express');
const cors = require('cors');
const HandlePromiseError = require('./src/lib/HandlePromiseError');
const ExpressErrorMiddleware = require('./src/lib/ExpressErrorMiddleware');
const PeopleController = require('./src/controllers/PeopleController');

const server = function server(cognitoExpress) {
  const app = express();

  // Body parser
  app.use(express.json());

  // Separate router for authenticated routes
  const authenticatedRoute = express.Router();

  // ///////////////////////////
  //
  // CORS For all ORIGINS!!!!!!
  //
  // ///////////////////////////
  app.use(cors());
  app.use('/api', authenticatedRoute);
  app.enable('trust proxy'); // Allows correct protocol to be used when constructing URI's.

  // Our middleware that authenticates all APIs under our 'authenticatedRoute' Router
  authenticatedRoute.use((req, res, next) => {
    const accessTokenFromClient = req.query.token;
    if (!accessTokenFromClient) {
      return res.status(401).send({
        errors: [
          { element: 'token', message: 'Access Token missing from query' },
        ],
      });
    }

    cognitoExpress.validate(accessTokenFromClient, (err, response) => {
      if (err) {
        return res
          .status(401)
          .send({ errors: [{ element: 'token', message: err }] });
      }

      if (response['custom:isRoot'] !== 1) {
        return res
          .status(401)
          .send({ errors: [{ element: 'token', message: 'You do not have the necessary privileges' }] });
      }

      // Store Cognito user
      res.locals.user = response;
      next();
      return null;
    });
    return null;
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

  authenticatedRoute.get(
    '/whoami', HandlePromiseError((req, res) => {
      res.send(`You are: ${JSON.stringify(res.locals.user)}`);
    }),
  );
  authenticatedRoute.get('/people/:user_uuid', PeopleController.show);
  authenticatedRoute.get('/people', PeopleController.index);
  authenticatedRoute.post('/people', PeopleController.create);

  // Unauthenticated routes
  app.get('/customers/', (req, res) => {
    res.send('OK!');
  });

  // Error handler
  app.use(ExpressErrorMiddleware);
  return app;
};

module.exports = server;
