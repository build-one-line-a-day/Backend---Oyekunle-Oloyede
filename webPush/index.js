const router = require('express').Router();
const webPush = require('web-push');

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webPush.setVapidDetails(
  'mailto:test@mydomain.com',
  publicVapidKey,
  privateVapidKey,
);

router.post('/', (req, res) => {
  const subscription = req.body;

  if (!('subscription' in subscription))
    return res.status(400).json({
      status: 400,
      message: 'You must pass a subscription.',
    });

  res.status(201).json({});

  const payload = JSON.stringify({
    title: 'One Line a Day',
  });
  console.log(subscription);

  webPush
    .sendNotification(subscription, payload)
    .catch(error => console.error(error.stack));
});

module.exports = router;
