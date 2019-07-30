const Model = require('./entryModel');

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
