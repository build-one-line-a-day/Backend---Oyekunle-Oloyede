const cloudinary = require('cloudinary');
const Model = require('./entryModel');
const ImageModel = require('./imageModel');

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
    const image = await ImageModel.getById(id);

    // eslint-disable-next-line
    image ? (entry.image = image) : (entry.image = null);

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

    let image = null;

    if (req.file) {
      const { url, public_id } = req.file;
      const entry_id = entry[0].id;

      [image] = await ImageModel.insertImage({ url, public_id, entry_id });
    }

    entry[0].image = image;

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
    const image = await ImageModel.getById(id);

    // eslint-disable-next-line
    image ? (entry[0].image = image) : (entry[0].image = null);

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
    const { public_id } = await ImageModel.getPublicId(id);
    await cloudinary.uploader.destroy(public_id);

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
