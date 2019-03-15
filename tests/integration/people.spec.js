const chai = require('chai');
const request = require('supertest');
const sequelize = require('../../src/models/sequelizeInstance');
const People = require('../../src/models/People');

const { expect } = chai;

function cognitoStub() {
  return {
    validate: (token, callback) => {
      callback(null, { stubbed: true });
      return null;
    },
  };
}

describe('API Tests - DB integration', () => {
  beforeEach(async function() {
    await People.destroy({ truncate: true });
    People.create;
  });
  after(() => {
    sequelize.close();
  });

  context('POST', () => {
    it('should create a person', async () => {
      const data = {
        user_uuid: 'jonny=boy-uuid',
        first_name: 'Blue',
        surname: 'Printy',
      };

      const server = require('../../server')(cognitoStub());
      const res = await request(server)
        .post('/api/people?token=itsstubbed')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(data)
        .expect(200);
      const person = await People.findOne({
        where: { user_uuid: 'jonny=boy-uuid' },
      });
      expect(person.first_name).to.equal('Blue');
      expect(person.surname).to.equal('Printy');
    });
  });
});
