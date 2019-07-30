const router = require('express').Router();
const handler = require('./entryHandlers');

router.get('/', handler.getEntries);
router.get('/:id', handler.getEntryById);

module.exports = router;
