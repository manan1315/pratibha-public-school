const Popup = require('../models/Popup');

exports.getActivePopup = async (req, res) => {
  try {
    const now = new Date();
    const popup = await Popup.findOne({
      isActive: true,
      startDate: { $lte: now },
      $or: [
        { endDate: { $gte: now } },
        { endDate: { $exists: false } },
        { endDate: null },
      ],
    }).sort({ createdAt: -1 });
    res.json(popup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPopups = async (req, res) => {
  try {
    const popups = await Popup.find().sort({ createdAt: -1 });
    res.json(popups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPopup = async (req, res) => {
  try {
    const popup = await Popup.create(req.body);
    res.status(201).json(popup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePopup = async (req, res) => {
  try {
    const popup = await Popup.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!popup) return res.status(404).json({ message: 'Popup not found' });
    res.json(popup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePopup = async (req, res) => {
  try {
    const popup = await Popup.findByIdAndDelete(req.params.id);
    if (!popup) return res.status(404).json({ message: 'Popup not found' });
    res.json({ message: 'Popup deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
