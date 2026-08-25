const Leadership = require('../models/Leadership');

exports.getLeadership = async (req, res) => {
  try {
    const leadership = await Leadership.find({ isActive: true }).sort({ order: 1 });
    res.json(leadership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllLeadership = async (req, res) => {
  try {
    const leadership = await Leadership.find().sort({ order: 1 });
    res.json(leadership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createLeadership = async (req, res) => {
  try {
    const leadership = await Leadership.create(req.body);
    res.status(201).json(leadership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateLeadership = async (req, res) => {
  try {
    const leadership = await Leadership.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!leadership) return res.status(404).json({ message: 'Profile not found' });
    res.json(leadership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteLeadership = async (req, res) => {
  try {
    const leadership = await Leadership.findByIdAndDelete(req.params.id);
    if (!leadership) return res.status(404).json({ message: 'Profile not found' });
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
