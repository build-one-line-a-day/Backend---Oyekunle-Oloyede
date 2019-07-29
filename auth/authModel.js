const db = require('../database/dbConfig');

exports.get = id => {
  const query = db('users');

  return id ? query.where({ id }).first() : query;
};

exports.insert = user => db('users').insert(user);

exports.getByUsername = username => db('users').where({ username }).first();
