const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      enum: ['welcome', 'ethos', 'vision', 'mission', 'society', 'pedagogy', 'engagement', 'beyond', 'curriculum'],
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('About', aboutSchema);
