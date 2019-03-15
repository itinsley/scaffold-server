const chai = require('chai');
const request = require('supertest');
const sequelize = require('../../src/models/sequelizeInstance');
const People = require('../../src/models/People');

const { expect } = chai;

function cognitoStub() {
  const response = {'custom:isRoot':1};
  return {
    validate: (token, callback) => {
      callback(null, response);
      return null;
    },
  };
}

function byUserUuid(userUuid){
  return (row)=> {return (row.user_uuid==userUuid)};
}


describe('API Tests - DB integration', () => {
  beforeEach(async function() {
    await People.destroy({ truncate: true });
    await People.create({user_uuid: 'james-123', first_name: 'James', surname: 'Brown'});
    await People.create({user_uuid: 'aretha-123', first_name: 'Aretha', surname: 'Franklin'});
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
  context('GET', () => {
    it('Index - should get a list', async () => {
      const server = require('../../server')(cognitoStub());
      const res = await request(server)
        .get('/api/people?token=itsstubbed')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200);
      expect(res.body.length).to.equal(2);
      expect(res.body.find(byUserUuid('james-123')).first_name).to.eql('James')
    });
    it('Show - should get a single row', async () => {
      const server = require('../../server')(cognitoStub());
      const res = await request(server)
        .get('/api/people/aretha-123?token=itsstubbed')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200);
      expect(res.body.first_name).to.eql('Aretha')
    });
  });
});
