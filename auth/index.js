const router = require('express').Router();
const handlers = require('./authHandlers');

router.get('/users', handlers.getUsers);
router.get('/users/:id', handlers.getUserById);
router.post('/register', handlers.register);

module.exports = router;
