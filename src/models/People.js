const Sequelize = require('sequelize');
const sequelize = require('./sequelizeInstance');

const People = sequelize.define(
  'people',
  {
    user_uuid: { type: Sequelize.STRING, allowNull: false, unique: true },
    first_name: { type: Sequelize.STRING, allowNull: false },
    surname: { type: Sequelize.STRING, allowNull: false },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

module.exports = People;
