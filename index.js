require('dotenv').config();
const server = require('./api/server');

const { PORT } = process.env;

server.listen(PORT, () =>
  console.log(`=== Server up and doing at port ${PORT} ===`),
);
