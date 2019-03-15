const People = require('../models/People');

const create = async (req, res) => {
  await People.create(req.body);
  return res.send({ message: 'Successfully inserted' });
};

const index = async (req, res) => {
  const people = await People.findAll();
  return res.send(people);
};

const show = async (req, res) => {
  const person = await People.findOne({ where: { user_uuid: req.params.user_uuid } });
  res.send(person);
};
module.exports = {
  create,
  index,
  show,
};
