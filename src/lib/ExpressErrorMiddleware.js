const log = require('loglevel');

module.exports = (err, req, res, next) => {
  log.error('Unhandled Exception', err);
  const errJson = { errors: { entity: ['Unhandled exception occurred.'] } };
  res.status(500).send(errJson);
};
