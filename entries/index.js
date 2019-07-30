const router = require('express').Router();
const handler = require('./entryHandlers');
const middleware = require('./entryMIddleware');

router.get('/', middleware.protectPage, handler.getEntries);
router.get(
  '/:id',
  middleware.protectPage,
  middleware.validateId,
  handler.getEntryById,
);
router.post(
  '/',
  middleware.protectPage,
  middleware.validateEntry,
  handler.createEntry,
);
router.put(
  '/:id',
  middleware.protectPage,
  middleware.validateId,
  middleware.validateEntry,
  handler.updateEntry,
);
router.delete(
  '/:id',
  middleware.protectPage,
  middleware.validateId,
  handler.removeEntry,
);

module.exports = router;
