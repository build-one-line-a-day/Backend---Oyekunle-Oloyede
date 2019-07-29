const Model = require('./authModel');

const validateId = async (req, res, next) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id))
    return res.status(404).json({
      status: 404,
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

  if (!email || !password)
    return res.status(400).json({
      status: 400,
      message: 'Login credential must include username and password.',
    });

  next();
};

module.exports = {
  validateId,
  validateLogin,
};
