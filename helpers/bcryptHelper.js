const bcrypt = require('bcrypt');

exports.hash = async pwd => {
  const hash = await bcrypt.hash(pwd, 12);
  return hash;
};

exports.compare = async (pwd, hash) => {
  const match = await bcrypt.compare(pwd, hash);
  return match;
};
