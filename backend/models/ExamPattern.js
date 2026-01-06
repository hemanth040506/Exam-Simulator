const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    questionCount: {
      type: Number,
      required: true,
      min: 0,
    },
    marksPerQuestion: {
      type: Number,
      required: true,
    },
    negativeMarks: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const examPatternSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
  },
  duration: {
    type: Number,
    required: true, // in minutes
    min: 1,
  },
  sections: {
    type: [sectionSchema],
    default: [],
  },
  instructions: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ExamPattern', examPatternSchema);

