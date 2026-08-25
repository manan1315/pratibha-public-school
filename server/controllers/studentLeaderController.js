const StudentLeader = require('../models/StudentLeader');

exports.getStudentLeaders = async (req, res) => {
  try {
    const leaders = await StudentLeader.find({ isActive: true }).sort({ order: 1 });
    res.json(leaders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllStudentLeaders = async (req, res) => {
  try {
    const leaders = await StudentLeader.find().sort({ order: 1 });
    res.json(leaders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createStudentLeader = async (req, res) => {
  try {
    const leader = await StudentLeader.create(req.body);
    res.status(201).json(leader);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStudentLeader = async (req, res) => {
  try {
    const leader = await StudentLeader.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!leader) return res.status(404).json({ message: 'Student leader not found' });
    res.json(leader);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStudentLeader = async (req, res) => {
  try {
    const leader = await StudentLeader.findByIdAndDelete(req.params.id);
    if (!leader) return res.status(404).json({ message: 'Student leader not found' });
    res.json({ message: 'Student leader deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
