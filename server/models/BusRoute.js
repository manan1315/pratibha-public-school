const mongoose = require('mongoose');

const busRouteSchema = new mongoose.Schema(
  {
    routeNumber: { type: String, required: true },
    routeName: { type: String, required: true },
    stops: [{ type: String }],
    timing: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BusRoute', busRouteSchema);
