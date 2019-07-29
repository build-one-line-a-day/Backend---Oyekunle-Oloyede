const request = require('supertest');
const server = require('../../api/server');
const db = require('../../database/dbConfig');

beforeAll(async () => {
  await db('users').truncate();
});

describe('/api/auth/register [POST]', () => {
  it('returns 201 on creation.', () =>
    request(server)
      .post('/api/auth/register')
      .send({
        firstname: 'John',
        lastname: 'Doe',
        username: 'jhdoe',
        email: 'jh@john.com',
        password: '12345',
      })
      .expect('Content-Type', /json/)
      .expect(201));

  it('returns 400 for bad request', () =>
    request(server)
      .post('/api/auth/register')
      .send({})
      .expect('Content-Type', /json/)
      .expect(400));
});

describe('/api/auth/users [GET]', () => {
  it('gets the user as an array', () =>
    request(server)
      .get('/api/auth/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.data).toHaveLength(1);
      }));

  it('gets a user by id', () =>
    request(server)
      .get('/api/auth/users/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.data).toEqual({
          id: 1,
          firstname: 'John',
          lastname: 'Doe',
        });
      }));
});

describe('/api/auth/login [POST]', () => {
  it('returns 200 on log in', () =>
    request(server)
      .post('/api/auth/login')
      .send({
        email: 'jh@john.com',
        password: '12345',
      })
      .expect('Content-Type', /json/)
      .expect(200));

  it('returns a message on log in.', () =>
    request(server)
      .post('/api/auth/login')
      .send({
        email: 'jh@john.com',
        password: '12345',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual('Login successful.');
      }));

  it('returns a 400 for bad request', () =>
    request(server)
      .post('/api/auth/login')
      .send({
        email: 'bad@bad.com',
        password: 'very bad',
      })
      .expect(400));
});
