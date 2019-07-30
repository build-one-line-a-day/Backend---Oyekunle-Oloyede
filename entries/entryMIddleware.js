const Model = require('./entryModel');
const { get } = require('../auth/authModel');
const { verify } = require('../helpers/jwtHelper');

exports.validateId = async (req, res, next) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id))
    return res.status(400).json({
      status: 400,
      message: 'Request parameter must be an integer.',
    });

  try {
    const entry = await Model.get(id);

    if (!entry)
      return res.status(404).json({
        status: 404,
        message: 'No entry matches that Id',
      });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Error getting entry.',
    });
  }

  next();
};

exports.validateEntry = async (req, res, next) => {
  const { title, text, user_id } = req.body;

  const errorMessage = {};
  let error = false;

  if (!title || title.length < 3) {
    errorMessage.title =
      'Title field of length 3 characters or more must be provided.';
    error = true;
  }

  if (!text || text.length < 3) {
    errorMessage.text =
      'Text field of length 3 characters or more must be provided.';
    error = true;
  }

  if (!user_id) {
    errorMessage.user_id =
      'user_id field of type integer more must be provided.';
    error = true;
  }

  const user = await get(user_id || -1);

  if (!user) {
    errorMessage.userIdCredential = 'No user matches the user_id provided';
    error = true;
  }

  if (error)
    return res.status(400).json({
      status: 400,
      details: errorMessage,
    });

  next();
};

exports.protectPage = (req, res, next) => {
  const token = req.get('Authorization');

  if (!token)
    return res.status(401).json({
      status: 401,
      message: 'No token provided, must be set on the Authorization Header',
    });

  try {
    const isAuthorized = verify(token);

    if (isAuthorized) next();
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: 'Invalid user token.',
    });
  }
};
