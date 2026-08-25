const Facility = require('../models/Facility');

exports.getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find({ isActive: true }).sort({ order: 1 });
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find().sort({ order: 1 });
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createFacility = async (req, res) => {
  try {
    const facility = await Facility.create(req.body);
    res.status(201).json(facility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!facility) return res.status(404).json({ message: 'Facility not found' });
    res.json(facility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndDelete(req.params.id);
    if (!facility) return res.status(404).json({ message: 'Facility not found' });
    res.json({ message: 'Facility deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
