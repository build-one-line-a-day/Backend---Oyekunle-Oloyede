const db = require('../database/dbConfig');

const get = id => {
  const queries = db('entries');

  return id ? queries.where({ id }).first() : queries;
};

const insert = user =>
  db('entries').insert(user, ['id', 'title', 'text', 'user_id', 'created_at']);

module.exports = {
  get,
  insert,
};
