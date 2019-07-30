const Model = require('./entryModel');

const getEntries = async (req, res) => {
  try {
    const entries = await Model.get();

    if (!entries.length)
      return res.status(404).json({
        status: 404,
        message: 'No entries created yet.',
      });

    res.status(200).json({
      status: 200,
      data: entries,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Cannot get entries',
    });
  }
};

module.exports = {
  getEntries,
};
