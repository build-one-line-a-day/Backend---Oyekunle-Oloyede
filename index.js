require('dotenv').config();
const server = require('./api/server');

const PORT = process.env.PORT || 500;

server.listen(PORT, () =>
  console.log(`=== Server up and doing at port ${PORT} ===`),
);
