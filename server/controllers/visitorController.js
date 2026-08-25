const Visitor = require('../models/Visitor');

exports.incrementVisitor = async (req, res) => {
  try {
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = await Visitor.create({ count: 1 });
    } else {
      visitor.count += 1;
      visitor.lastUpdated = new Date();
      await visitor.save();
    }
    res.json({ count: visitor.count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVisitorCount = async (req, res) => {
  try {
    const visitor = await Visitor.findOne();
    res.json({ count: visitor ? visitor.count : 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
