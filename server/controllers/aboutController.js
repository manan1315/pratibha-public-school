const About = require('../models/About');

exports.getAbout = async (req, res) => {
  try {
    const section = req.query.section;
    const query = section ? { section } : {};
    const abouts = await About.find(query);
    res.json(abouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAbout = async (req, res) => {
  try {
    const about = await About.create(req.body);
    res.status(201).json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAbout = async (req, res) => {
  try {
    const about = await About.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!about) return res.status(404).json({ message: 'Content not found' });
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAbout = async (req, res) => {
  try {
    const about = await About.findByIdAndDelete(req.params.id);
    if (!about) return res.status(404).json({ message: 'Content not found' });
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
