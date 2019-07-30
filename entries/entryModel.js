const db = require('../database/dbConfig');

const get = id => {
  const queries = db('entries');

  return id ? queries.where({ id }).first() : queries;
};

const getByUserId = user_id =>
  db('entries')
    .where({ user_id })
    .select('id', 'title', 'text', 'created_at');

const insert = user =>
  db('entries').insert(user, ['id', 'title', 'text', 'user_id', 'created_at']);

const update = (id, user) =>
  db('entries')
    .where({ id })
    .update(user, ['id', 'title', 'text', 'user_id', 'created_at']);

const remove = id =>
  db('entries')
    .where({ id })
    .del();

module.exports = {
  get,
  insert,
  update,
  remove,
  getByUserId,
};
