const request = require('supertest');
const app = require('../app')

/**
 *   En este endpoint deberá hacer lo siguiente:
        • Pedir los datos mínimos para crear una persona.
        • Crear un usuario y asociarlo
        • Y por último crear una cuenta que se asocie a la persona.
*/
describe('Alta de cuenta ', () => {
  const DATA = {
      name : 'Jose Enrique',
      lastName: 'Vergara Ambriz',
      phoneNumber: '55223111294',
      rfc: 'RFCDUMMY1234',
      userName: 'ENRIQUEMORE587',
      password: 'password',
      nip: '1234'
  }
  it('Create checkbook account', function(done) {
    let JOURNEY = 'checkbook';
    request(app)
      .post(`/accounts/${JOURNEY}`)
      .send({...DATA})
      .timeout(10000)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done)
  });
  it('Create credit account', (done) => {
      let JOURNEY = 'credit';
      request(app)
      .post(`/accounts/${JOURNEY}`)
      .send({...DATA})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done);
  })
  it('Create debit account', (done) => {
      let JOURNEY = 'debit';
      request(app)
      .post(`/accounts/${JOURNEY}`)
      .send({...DATA})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done);
  })
  it('Create invalid account', (done) => {
      let JOURNEY = 'another';
      request(app)
      .post(`/accounts/${JOURNEY}`)
      .send({...DATA})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  })
  it('Create invalid data request', (done) => {
    let JOURNEY = 'checkbook';
    let data = DATA
    delete data.lastName
    request(app)
    .post(`/accounts/${JOURNEY}`)
    .send({...data})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(400)
    .then( response => {
        console.log(response.body);
        console.log("It should be true=>", response.body.message == '"lastName" is required');
        done()
        })
    })
  
});