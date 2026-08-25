const Download = require('../models/Download');

exports.getDownloads = async (req, res) => {
  try {
    const downloads = await Download.find().sort({ createdAt: -1 });
    res.json(downloads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createDownload = async (req, res) => {
  try {
    const download = await Download.create(req.body);
    res.status(201).json(download);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDownload = async (req, res) => {
  try {
    const download = await Download.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!download) return res.status(404).json({ message: 'Download not found' });
    res.json(download);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDownload = async (req, res) => {
  try {
    const download = await Download.findByIdAndDelete(req.params.id);
    if (!download) return res.status(404).json({ message: 'Download not found' });
    res.json({ message: 'Download deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
