const router = require('express').Router();
const handlers = require('./authHandlers');

router.get('/users', handlers.getUsers);
router.get('/users/:id', handlers.getUserById);
router.post('/register', handlers.register);
router.post('/login', handlers.login);

module.exports = router;
