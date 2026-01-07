const express = require('express');
const ExamAttempt = require('../models/ExamAttempt');
const ExamSet = require('../models/ExamSet');
const Question = require('../models/Question');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Helper function to evaluate answer
const evaluateAnswer = (question, userAnswer) => {
  const { type, correctAnswer, marks, negativeMarks } = question;
  let isCorrect = false;
  let score = 0;

  if (!userAnswer || userAnswer === '' || (Array.isArray(userAnswer) && userAnswer.length === 0)) {
    // Unattempted
    return { isCorrect: false, score: 0 };
  }

  switch (type) {
    case 'mcq':
      // Single answer comparison
      isCorrect = String(userAnswer).trim() === String(correctAnswer).trim();
      break;

    case 'msq':
      // Multiple select: compare arrays (order doesn't matter)
      const userArray = Array.isArray(userAnswer) ? userAnswer.map(a => String(a).trim()).sort() : [String(userAnswer).trim()];
      const correctArray = Array.isArray(correctAnswer) 
        ? correctAnswer.map(a => String(a).trim()).sort() 
        : [String(correctAnswer).trim()];
      
      if (userArray.length !== correctArray.length) {
        isCorrect = false;
      } else {
        isCorrect = userArray.every((val, idx) => val === correctArray[idx]);
      }
      break;

    case 'integer':
    case 'nat':
      // Numeric answer: compare as numbers
      const userNum = Number(userAnswer);
      const correctNum = Number(correctAnswer);
      isCorrect = !isNaN(userNum) && !isNaN(correctNum) && userNum === correctNum;
      break;

    default:
      isCorrect = false;
  }

  if (isCorrect) {
    score = marks;
  } else {
    // NAT/Integer questions: no negative marking (score = 0 for wrong answers)
    if (type === 'integer' || type === 'nat') {
      score = 0;
    } else {
      // MCQ/MSQ: apply negative marking
      score = -negativeMarks;
    }
  }

  return { isCorrect, score };
};

// POST /api/exam-attempts/submit/:setId
// Submit exam answers and evaluate
router.post('/submit/:setId', authMiddleware, async (req, res) => {
  try {
    const { setId } = req.params;
    const { answers } = req.body;
    const userId = req.user.userId;

    // Validate ObjectId format
    if (!setId || !/^[0-9a-fA-F]{24}$/.test(setId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid exam set ID format',
      });
    }

    // Validate answers
    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Answers object is required',
      });
    }

    // Fetch exam set
    const examSet = await ExamSet.findById(setId)
      .populate('exam', 'key name');

    if (!examSet) {
      return res.status(404).json({
        success: false,
        message: 'Exam set not found',
      });
    }

    // Fetch all questions for this exam set
    const questions = await Question.find({ examSet: setId });

    if (questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No questions found for this exam set',
      });
    }

    // Evaluate answers
    let totalScore = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;
    const evaluationDetails = [];

    questions.forEach((question) => {
      const questionId = question._id.toString();
      const userAnswer = answers[questionId];

      if (!userAnswer || userAnswer === '' || (Array.isArray(userAnswer) && userAnswer.length === 0)) {
        unattemptedCount++;
        evaluationDetails.push({
          questionId: questionId,
          isCorrect: false,
          score: 0,
          status: 'unattempted',
        });
        return;
      }

      const evaluation = evaluateAnswer(question, userAnswer);
      totalScore += evaluation.score;

      if (evaluation.isCorrect) {
        correctCount++;
        evaluationDetails.push({
          questionId: questionId,
          isCorrect: true,
          score: evaluation.score,
          status: 'correct',
        });
      } else {
        wrongCount++;
        evaluationDetails.push({
          questionId: questionId,
          isCorrect: false,
          score: evaluation.score,
          status: 'wrong',
        });
      }
    });

    // Create exam attempt record
    const examAttempt = new ExamAttempt({
      user: userId,
      exam: examSet.exam._id,
      examSet: examSet._id,
      score: totalScore,
      evaluated: true,
      submittedAt: new Date(),
    });

    // Convert answers object to Map
    const answersMap = new Map();
    Object.keys(answers).forEach((key) => {
      answersMap.set(key, answers[key]);
    });
    examAttempt.answers = answersMap;

    await examAttempt.save();

    // Return evaluation results
    res.status(200).json({
      success: true,
      message: 'Exam submitted successfully',
      data: {
        attemptId: examAttempt._id,
        score: totalScore.toFixed(2),
        stats: {
          total: questions.length,
          correct: correctCount,
          wrong: wrongCount,
          unattempted: unattemptedCount,
        },
        evaluationDetails: evaluationDetails,
        submittedAt: examAttempt.submittedAt,
      },
    });
  } catch (error) {
    console.error('Error submitting exam:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit exam',
      error: error.message,
    });
  }
});

module.exports = router;
