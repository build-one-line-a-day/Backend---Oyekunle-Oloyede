const Model = require('./authModel');

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
      message: 'Error getting users.',
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
};
