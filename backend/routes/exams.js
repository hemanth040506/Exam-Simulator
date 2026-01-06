const express = require('express');
const Exam = require('../models/Exam');
const ExamSet = require('../models/ExamSet');
const ExamPattern = require('../models/ExamPattern');
const Question = require('../models/Question');

const router = express.Router();

// GET /api/exams
// Return all active exams
router.get('/exams', async (req, res) => {
  try {
    const exams = await Exam.find({ active: true }).select(
      'key name description active createdAt'
    );

    res.status(200).json({
      success: true,
      data: exams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch exams',
      error: error.message,
    });
  }
});

// GET /api/exams/:examKey/sets
// Return all active exam sets for the given exam key
router.get('/exams/:examKey/sets', async (req, res) => {
  try {
    const { examKey } = req.params;

    const exam = await Exam.findOne({ key: examKey.toLowerCase(), active: true });

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found',
      });
    }

    const examSets = await ExamSet.find({
      exam: exam._id,
      active: true,
    })
      .select('title date shift createdAt')
      .sort({ date: 1, shift: 1 });

    res.status(200).json({
      success: true,
      exam: {
        id: exam._id,
        key: exam.key,
        name: exam.name,
      },
      data: examSets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch exam sets',
      error: error.message,
    });
  }
});

// GET /api/exam-sets/:setId
// Return exam set details including linked exam pattern and instructions
router.get('/exam-sets/:setId', async (req, res) => {
  try {
    const { setId } = req.params;

    // Validate ObjectId format
    if (!setId || !/^[0-9a-fA-F]{24}$/.test(setId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid exam set ID format',
      });
    }

    const examSet = await ExamSet.findById(setId)
      .populate('exam', 'key name description active')
      .populate('pattern');

    if (!examSet) {
      return res.status(404).json({
        success: false,
        message: 'Exam set not found',
      });
    }

    res.status(200).json({
      success: true,
      data: examSet,
    });
  } catch (error) {
    console.error('Error fetching exam set:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch exam set details',
      error: error.message,
    });
  }
});

// GET /api/exam-sets/:setId/questions
// Return all questions for the given exam set
router.get('/exam-sets/:setId/questions', async (req, res) => {
  try {
    const { setId } = req.params;

    // Validate ObjectId format
    if (!setId || !/^[0-9a-fA-F]{24}$/.test(setId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid exam set ID format',
      });
    }

    // Verify exam set exists
    const examSet = await ExamSet.findById(setId);
    if (!examSet) {
      return res.status(404).json({
        success: false,
        message: 'Exam set not found',
      });
    }

    // Fetch questions for this exam set
    const questions = await Question.find({ examSet: setId })
      .select('section type questionText options correctAnswer marks negativeMarks')
      .sort({ section: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch questions',
      error: error.message,
    });
  }
});

module.exports = router;

