const mongoose = require('mongoose');

const examSetSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
  },
  title: {
    type: String,
    required: true, // e.g. "JEE 22 Jan 2025 FN"
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  shift: {
    type: String, // e.g. "FN", "AN", "Morning", "Evening"
    trim: true,
  },
  pattern: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExamPattern',
    required: true,
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

module.exports = mongoose.model('ExamSet', examSetSchema);

