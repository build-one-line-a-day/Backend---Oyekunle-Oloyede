const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

let token;
let id;
let entryId;

beforeAll(async () => {
  await db.raw('TRUNCATE TABLE users, entries CASCADE');
  await db.raw('TRUNCATE TABLE entries, images CASCADE');

  await request(server)
    .post('/api/auth/register')
    .send({
      firstname: 'John',
      lastname: 'Doe',
      username: 'jhdoe',
      email: 'jh@john.com',
      password: '12345',
    });

  const user = await request(server)
    .post('/api/auth/login')
    .send({
      email: 'jh@john.com',
      password: '12345',
    });

  // eslint-disable-next-line
  id = user.body.user.id;
  // eslint-disable-next-line
  token = user.body.token;

  const entry = await db('entries').insert(
    {
      title: 'random entry',
      text: 'go, and may the codes be with you.',
      user_id: id,
    },
    ['id'],
  );

  entryId = entry[0].id;
});

describe('/api/entries [GET]', () => {
  it('gets the entries', () =>
    request(server)
      .get('/api/entries')
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.data).toHaveLength(1);
      }));

  it('gets the entries', () =>
    request(server)
      .get('/api/entries/df')
      .set('Authorization', token)
      .expect(400)
      .expect('Content-Type', /json/));

  it('gets an entry by id', () =>
    request(server)
      .get(`/api/entries/${entryId}`)
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.data.title).toEqual('random entry');
      }));
});

describe('/api/entries/user [GET]', () => {
  it('get a users entries', () =>
    request(server)
      .get(`/api/entries/user/${id}`)
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.data).toHaveLength(1);
      }));

  it('returns a 400', () =>
    request(server)
      .get('/api/entries/user/-1')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(400));
});

describe('/api/entries [POST]', () => {
  it('creates an entry', () =>
    request(server)
      .post('/api/entries')
      .send({
        title: 'random entry',
        text: 'go, and may the codes be with you.',
        user_id: id,
      })
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(201)
      .then(res => {
        expect(res.body.data[0].title).toEqual('random entry');
      }));

  it('400 for non-existing users', () =>
    request(server)
      .post('/api/entries')
      .send({
        title: 'random entry',
        text: 'go, and may the codes be with you.',
        user_id: -1,
      })
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(400));

  it('creates an entry', () =>
    request(server)
      .post('/api/entries')
      .send({})
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(400));
});

describe('/api/entries/:id [PUT]', () => {
  it('updates an entry', () =>
    request(server)
      .put(`/api/entries/${entryId}`)
      .send({
        title: 'random entry',
        text: 'go, and may the codes be with you.',
        user_id: id,
      })
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.data[0].title).toEqual('random entry');
      }));

  it('updates an entry', () =>
    request(server)
      .put('/api/entries/1')
      .send({
        title: 'random entry',
        text: 'go, and may the codes be with you.',
        user_id: id,
      })
      .expect('Content-Type', /json/)
      .expect(401));
});

describe('/api/entries/:id [DELETE]', () => {
  it('deletes an entry', () =>
    request(server)
      .delete(`/api/entries/${entryId + 1}`)
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200));

  it('deletes an entry', () =>
    request(server)
      .delete(`/api/entries/${entryId}`)
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.data).toEqual('1 entry deleted.');
      }));
});
