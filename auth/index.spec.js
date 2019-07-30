const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

let id;

beforeAll(async () => {
  await db.raw('TRUNCATE TABLE users, entries CASCADE');
  const [row] = await db('users').insert(
    {
      firstname: 'John',
      lastname: 'Doe',
      username: 'jhdoe',
      email: 'jh@john.com',
      password: '12345',
    },
    ['id'],
  );

  // eslint-disable-next-line
  id = row.id;
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
      .get(`/api/auth/users/${id}`)
      .expect('Content-Type', /json/)
      // .expect(200)
      .then(res => {
        expect(res.body.data).toEqual({
          id,
          firstname: 'John',
          lastname: 'Doe',
          email: 'jh@john.com',
        });
      }));
});

describe('/api/auth/register [POST]', () => {
  it('returns 201 on creation.', () =>
    request(server)
      .post('/api/auth/register')
      .send({
        firstname: 'Jane',
        lastname: 'Doe',
        username: 'janeDoe',
        email: 'jane@doe.com',
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

describe('/api/auth/login [POST]', () => {
  it('returns 200 on log in', () =>
    request(server)
      .post('/api/auth/login')
      .send({
        email: 'jane@doe.com',
        password: '12345',
      })
      .expect('Content-Type', /json/)
      .expect(200));

  it('returns a user object on log in.', () =>
    request(server)
      .post('/api/auth/login')
      .send({
        email: 'jane@doe.com',
        password: '12345',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.user.email).toEqual('jane@doe.com');
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
