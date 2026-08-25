const BusRoute = require('../models/BusRoute');

exports.getBusRoutes = async (req, res) => {
  try {
    const routes = await BusRoute.find({ isActive: true }).sort({ routeNumber: 1 });
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllBusRoutes = async (req, res) => {
  try {
    const routes = await BusRoute.find().sort({ routeNumber: 1 });
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBusRoute = async (req, res) => {
  try {
    const route = await BusRoute.create(req.body);
    res.status(201).json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBusRoute = async (req, res) => {
  try {
    const route = await BusRoute.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!route) return res.status(404).json({ message: 'Bus route not found' });
    res.json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBusRoute = async (req, res) => {
  try {
    const route = await BusRoute.findByIdAndDelete(req.params.id);
    if (!route) return res.status(404).json({ message: 'Bus route not found' });
    res.json({ message: 'Bus route deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
