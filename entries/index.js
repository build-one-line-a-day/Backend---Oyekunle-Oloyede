const router = require('express').Router();
const handler = require('./entryHandlers');

router.get('/', handler.getEntries);

module.exports = router;
