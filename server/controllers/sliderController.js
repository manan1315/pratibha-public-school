const Slider = require('../models/Slider');

exports.getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find({ isActive: true }).sort({ order: 1 });
    res.json(sliders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSliders = async (req, res) => {
  try {
    const sliders = await Slider.find().sort({ order: 1 });
    res.json(sliders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSlider = async (req, res) => {
  try {
    const slider = await Slider.create(req.body);
    res.status(201).json(slider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSlider = async (req, res) => {
  try {
    const slider = await Slider.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!slider) return res.status(404).json({ message: 'Slider not found' });
    res.json(slider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSlider = async (req, res) => {
  try {
    const slider = await Slider.findByIdAndDelete(req.params.id);
    if (!slider) return res.status(404).json({ message: 'Slider not found' });
    res.json({ message: 'Slider deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
