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

const getEntryById = async (req, res) => {
  const { id } = req.params;

  try {
    const entry = await Model.get(id);

    res.status(200).json({
      status: 200,
      data: entry,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Cannot get entry',
    });
  }
};

const getEntryByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const entries = await Model.getByUserId(id);

    if (!entries.length)
      return res.status(404).json({
        status: 404,
        message: 'User has not created an entry.',
      });

    res.status(200).json({
      status: 200,
      data: entries,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Cannot get entries.',
    });
  }
};

const createEntry = async (req, res) => {
  const { title, text, user_id } = req.body;

  try {
    const entry = await Model.insert({ title, text, user_id });

    res.status(201).json({
      status: 201,
      data: entry,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Cannot create entry.',
    });
  }
};

const updateEntry = async (req, res) => {
  const { id } = req.params;
  const { title, text, user_id } = req.body;

  try {
    const entry = await Model.update(id, { title, text, user_id });

    res.status(200).json({
      status: 200,
      data: entry,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Cannot update this entry.',
    });
  }
};

const removeEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const entry = await Model.remove(id);

    res.status(200).json({
      status: 200,
      data: `${entry} entry deleted.`,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: 'Cannot delete this entry.',
    });
  }
};

module.exports = {
  getEntries,
  getEntryById,
  getEntryByUserId,
  createEntry,
  updateEntry,
  removeEntry,
};
