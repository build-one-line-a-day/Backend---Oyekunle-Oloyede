const db = require('../database/dbConfig');

const insertImage = image =>
  db('images').insert(image, ['url']);

module.exports = {
  insertImage,
};
