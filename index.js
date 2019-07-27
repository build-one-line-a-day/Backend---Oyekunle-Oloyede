require('dotenv').config();
const server = require('./api/server');

const { PORT } = process.env;

server.listen(PORT, () =>
  process.stdout.write(`=== Server up and doing at port ${PORT} ===\n`),
);
