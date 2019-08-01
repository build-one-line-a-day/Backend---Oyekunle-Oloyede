const request = require('supertest');
const server = require('../api/server');

describe('/subscribe [POST]', () => {
  it('Returns a 400 without a subscription', () =>
    request(server)
      .post('/subscribe')
      .expect('Content-Type', /json/)
      .expect(400));
});
