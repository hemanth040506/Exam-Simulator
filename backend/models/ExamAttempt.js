const mongoose = require('mongoose');

const examAttemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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
  answers: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: new Map(),
  },
  score: {
    type: Number,
    default: 0,
  },
  evaluated: {
    type: Boolean,
    default: false,
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  submittedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
examAttemptSchema.index({ user: 1, examSet: 1 });
examAttemptSchema.index({ user: 1, submittedAt: -1 });

module.exports = mongoose.model('ExamAttempt', examAttemptSchema);
