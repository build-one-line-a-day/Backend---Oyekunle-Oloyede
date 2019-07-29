const router = require('express').Router();
const handlers = require('./authHandlers');
const middleware = require('./authMiddleware');

router.get('/users', handlers.getUsers);
router.get('/users/:id', middleware.validateId, handlers.getUserById);
router.post('/register', handlers.register);
router.post('/login', middleware.validateLogin, handlers.login);

module.exports = router;
