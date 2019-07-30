const router = require('express').Router();
const handler = require('./entryHandlers');

router.get('/', handler.getEntries);
router.get('/:id', handler.getEntryById);
router.post('/', handler.createEntry);
router.put('/:id', handler.updateEntry);

module.exports = router;
