const router = require('express').Router();
const handlers = require('./authHandlers');

router.get('/users', handlers.getUsers);

module.exports = router;
