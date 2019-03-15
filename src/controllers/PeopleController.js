const People = require('../models/People');

const create = (req, res) => {
  People.create(req.body);
  return res.send({ message: 'Successfully inserted' });
};

module.exports = {
  create,
};
