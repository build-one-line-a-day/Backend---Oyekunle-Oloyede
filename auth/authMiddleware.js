const Model = require('./authModel');

const validateId = async (req, res, next) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id))
    return res.status(400).json({
      status: 400,
      message: 'Request parameter must be an integer.',
    });

  try {
    const user = await Model.get(id);

    if (!user)
      return res.status(404).json({
        status: 404,
        message: 'No user matches that Id',
      });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Error getting user.',
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || typeof password !== 'string')
    return res.status(400).json({
      status: 400,
      message: 'Login credential must include username and password of type string.',
    });

  next();
};

const validateRegister = async (req, res, next) => {
  const { firstname, lastname, username, email, password } = req.body;

  const errorMessage = {};
  let error = false;

  if (!firstname || firstname.length < 2) {
    errorMessage.firstname =
      'Firstname field of length 2 characters or more must be provided.';
    error = true;
  }

  if (!lastname || lastname.length < 2) {
    errorMessage.lastname =
      'Lastname field of length 2 characters or more must be provided.';
    error = true;
  }

  if (!username || username.length < 4) {
    errorMessage.username =
      'Username field of length 4 characters or more must be provided.';
    error = true;
  }

  if (!email || !/(\w+)@(\w+)\.(\w+)/.test(email)) {
    errorMessage.email = 'Email field must be of the standard format.';
    error = true;
  }

  if (!password || password.length < 4 || typeof password !== 'string') {
    errorMessage.password =
      'Password field of type string and length 4 characters or more must be provided.';
    error = true;
  }

  const user = await Model.getByUsername(username || 'none');
  const emailTest = await Model.getByEmail(email || 'none');

  if (user) {
    errorMessage.usernameCredential = 'Username already exists.';
    error = true;
  }

  if (emailTest) {
    errorMessage.emailCredential = 'Email already exists.';
    error = true;
  }
  if (error)
    return res.status(400).json({
      status: 400,
      details: errorMessage,
    });

  next();
};

module.exports = {
  validateId,
  validateLogin,
  validateRegister,
};
