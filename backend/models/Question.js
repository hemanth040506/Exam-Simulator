const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
  },
  examSet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExamSet',
    required: true,
  },
  section: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['mcq', 'msq', 'integer'],
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    default: undefined, // omit field if not provided (useful for integer-type questions)
  },
  correctAnswer: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  negativeMarks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Question', questionSchema);

