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

module.exports = {
  getUsers,
};
