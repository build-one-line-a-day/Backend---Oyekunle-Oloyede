const db = require('../database/dbConfig');

const get = id => {
  const queries = db('entries');

  return id ? queries.where({ id }).first() : queries;
};

module.exports = {
  get,
};
