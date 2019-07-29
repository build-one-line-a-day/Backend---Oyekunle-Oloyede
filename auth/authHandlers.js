const Model = require('./authModel');
const bcryptHelper = require('../helpers/bcryptHelper');
const { sign } = require('../helpers/jwtHelper');

const getUsers = async (req, res) => {
  try {
    const users = await Model.get();

    if (!users.length)
      return res.status(400).json({
        status: 400,
        message: 'No users created yet.',
      });

    res.status(200).json({
      status: 200,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Error getting users.',
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Model.get(id);

    res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Error getting user.',
    });
  }
};

const register = async (req, res) => {
  const { firstname, lastname, username, email } = req.body;

  try {
    const password = await bcryptHelper.hash(req.body.password);

    await Model.insert({
      firstname,
      lastname,
      username,
      email,
      password,
    });

    res.status(201).json({
      status: 201,
      message: 'User created successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Error registering user.',
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Model.getByEmail(email);

    if (!user)
      return res.status(400).json({
        status: 400,
        message: 'Incorrect email',
      });

    const match = await bcryptHelper.compare(password, user.password);

    if (!match)
      return res.status(400).json({
        status: 400,
        message: 'Incorrect password.',
      });

    const token = await sign({ id: user.id });

    res.status(200).json({
      status: 200,
      token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Cannot log user in.',
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  register,
  login,
};
