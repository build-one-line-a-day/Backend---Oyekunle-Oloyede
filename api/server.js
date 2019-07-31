const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');

const server = express();
const authRouter = require('../auth');
const entryRouter = require('../entries');
const swaggerDocument = require('../apiDocumentation');

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());
server.use(helmet());
server.use(compression());
server.use(logger('dev'));

server.get('/', (req, res) =>
  res.status(200).json({
    status: 200,
    message: 'The One Line a Day server is alive and kicking!',
  }),
);

server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use('/api/auth', authRouter);
server.use('/api/entries', entryRouter);

server.use((req, res) =>
  res.status(404).json({
    status: 404,
    message: 'Resource not found!',
  }),
);

module.exports = server;
