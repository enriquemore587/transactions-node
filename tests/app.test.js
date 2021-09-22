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
      rfc: 'RFCDUMMY',
      userName: 'ENRIQUEMORE587',
      password: 'password'
  }
  it('Create checkbook account', function(done) {
    let JOURNEY = 'credit';
    request(app)
      .post(`/accounts/${JOURNEY}`)
      .send({...DATA})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done);
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
  
});