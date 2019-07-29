const db = require('../../database/dbConfig');
const Model = require('../authModel');

beforeEach(async () => {
  await db('users').truncate();
});

describe('successfully creates a user', () => {
  it('Adds user successfully', async () => {
    await Model.insert({
      firstname: 'John',
      lastname: 'Doe',
      username: 'jhdoe',
      email: 'jh@john.com',
      password: '12345',
    });
    const user = await Model.get();

    expect(user[0]).toEqual({
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
    });
  });
});

describe('gets users', () => {
  it('returns the user by id', async () => {
    await Model.insert({
      firstname: 'John',
      lastname: 'Doe',
      username: 'jhdoe',
      email: 'jh@john.com',
      password: '12345',
    });
    const user = await Model.get(1);

    expect(user).toEqual({
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
    });
  });

  it('returns an array of users', async () => {
    await Model.insert({
      firstname: 'John',
      lastname: 'Doe',
      username: 'jhdoe',
      email: 'jh@john.com',
      password: '12345',
    });
    await Model.insert({
      firstname: 'Jane',
      lastname: 'Doe',
      username: 'jndoe',
      email: 'jn@john.com',
      password: '12345',
    });
    const users = await Model.get();

    expect(users).toHaveLength(2);
  });
});

describe('gets user by username', () => {
  it('returns the user by username', async () => {
    await Model.insert({
      firstname: 'John',
      lastname: 'Doe',
      username: 'jhdoe',
      email: 'jh@john.com',
      password: '12345',
    });

    const user = await Model.getByUsername('jhdoe');

    expect(user.username).toEqual('jhdoe');
  });
});

describe('gets user by email', () => {
  it('returns the user by email', async () => {
    await Model.insert({
      firstname: 'John',
      lastname: 'Doe',
      username: 'jhdoe',
      email: 'jh@john.com',
      password: '12345',
    });

    const user = await Model.getByEmail('jh@john.com');

    expect(user.email).toEqual('jh@john.com');
  });
});
