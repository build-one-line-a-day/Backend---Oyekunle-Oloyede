const router = require('express').Router();
const handler = require('./entryHandlers');
const middleware = require('./entryMIddleware');

router.get('/', handler.getEntries);
router.get('/:id', middleware.validateId, handler.getEntryById);
router.post('/', handler.createEntry);
router.put('/:id', middleware.validateId, handler.updateEntry);
router.delete('/:id', middleware.validateId, handler.removeEntry);

module.exports = router;
