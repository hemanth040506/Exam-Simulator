const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true, // e.g. "gate", "jee", "eamcet"
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true, // e.g. "GATE", "JEE", "EAMCET"
    trim: true,
  },
  description: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Exam', examSchema);

