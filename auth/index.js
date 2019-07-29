const router = require('express').Router();
const handlers = require('./authHandlers');

router.get('/users', handlers.getUsers);
router.get('/users/:id', handlers.getUserById);

module.exports = router;
