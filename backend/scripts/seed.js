require("dotenv").config({ path: "../.env" });


const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Exam = require('../models/Exam');
const ExamPattern = require('../models/ExamPattern');
const ExamSet = require('../models/ExamSet');
const Question = require('../models/Question');

// Load environment variables
dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');

    // Check if JEE exam already exists
    let jeeExam = await Exam.findOne({ key: 'jee' });
    
    if (jeeExam) {
      console.log('JEE exam already exists. Skipping seed to avoid duplicates.');
      console.log('To re-seed, delete existing data first.');
      process.exit(0);
    }

    // 1. Create JEE Exam
    console.log('Creating JEE exam...');
    jeeExam = new Exam({
      key: 'jee',
      name: 'JEE',
      description: 'Joint Entrance Examination - Main',
      active: true,
    });
    await jeeExam.save();
    console.log('✓ JEE exam created');

    // 2. Create ExamPattern for JEE
    console.log('Creating exam pattern...');
    const jeePattern = new ExamPattern({
      exam: jeeExam._id,
      duration: 180, // 3 hours
      sections: [
        {
          name: 'Mathematics',
          questionCount: 25,
          marksPerQuestion: 4,
          negativeMarks: 1,
        },
        {
          name: 'Physics',
          questionCount: 25,
          marksPerQuestion: 4,
          negativeMarks: 1,
        },
        {
          name: 'Chemistry',
          questionCount: 25,
          marksPerQuestion: 4,
          negativeMarks: 1,
        },
      ],
      instructions: [
        'The exam consists of 75 questions divided into 3 sections.',
        'Each correct answer carries 4 marks.',
        'Each incorrect answer carries -1 mark.',
        'No marks will be deducted for unanswered questions.',
        'Use only blue or black ballpoint pen.',
        'Calculators are not allowed.',
      ],
    });
    await jeePattern.save();
    console.log('✓ Exam pattern created');

    // 3. Create ExamSet
    console.log('Creating exam set...');
    const examSet = new ExamSet({
      exam: jeeExam._id,
      title: 'JEE 22 Jan 2025 FN',
      date: new Date('2025-01-22'),
      shift: 'FN',
      pattern: jeePattern._id,
      active: true,
    });
    await examSet.save();
    console.log('✓ Exam set created');

    // 4. Create Sample Questions
    console.log('Creating sample questions...');
    const questions = [
      // Mathematics questions
      {
        exam: jeeExam._id,
        examSet: examSet._id,
        section: 'Mathematics',
        type: 'mcq',
        questionText: 'If f(x) = x² + 2x + 1, then f(2) equals:',
        options: ['5', '7', '9', '11'],
        correctAnswer: '9',
        marks: 4,
        negativeMarks: 1,
      },
      {
        exam: jeeExam._id,
        examSet: examSet._id,
        section: 'Mathematics',
        type: 'mcq',
        questionText: 'The derivative of sin(x) is:',
        options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'],
        correctAnswer: 'cos(x)',
        marks: 4,
        negativeMarks: 1,
      },
      {
        exam: jeeExam._id,
        examSet: examSet._id,
        section: 'Mathematics',
        type: 'integer',
        questionText: 'If log₂(x) = 3, then x equals:',
        correctAnswer: 8,
        marks: 4,
        negativeMarks: 1,
      },
      {
        exam: jeeExam._id,
        examSet: examSet._id,
        section: 'Mathematics',
        type: 'msq',
        questionText: 'Which of the following are prime numbers?',
        options: ['2', '4', '7', '9'],
        correctAnswer: ['2', '7'],
        marks: 4,
        negativeMarks: 1,
      },
      // Physics questions
      {
        exam: jeeExam._id,
        examSet: examSet._id,
        section: 'Physics',
        type: 'mcq',
        questionText: 'The SI unit of force is:',
        options: ['Joule', 'Newton', 'Watt', 'Pascal'],
        correctAnswer: 'Newton',
        marks: 4,
        negativeMarks: 1,
      },
      {
        exam: jeeExam._id,
        examSet: examSet._id,
        section: 'Physics',
        type: 'mcq',
        questionText: 'According to Newton\'s second law, F = ?',
        options: ['mv', 'ma', 'm/a', 'm²a'],
        correctAnswer: 'ma',
        marks: 4,
        negativeMarks: 1,
      },
      {
        exam: jeeExam._id,
        examSet: examSet._id,
        section: 'Physics',
        type: 'integer',
        questionText: 'If a car accelerates at 2 m/s² for 5 seconds from rest, its final velocity in m/s is:',
        correctAnswer: 10,
        marks: 4,
        negativeMarks: 1,
      },
      // Chemistry questions
      {
        exam: jeeExam._id,
        examSet: examSet._id,
        section: 'Chemistry',
        type: 'mcq',
        questionText: 'The atomic number of Carbon is:',
        options: ['6', '12', '14', '16'],
        correctAnswer: '6',
        marks: 4,
        negativeMarks: 1,
      },
      {
        exam: jeeExam._id,
        examSet: examSet._id,
        section: 'Chemistry',
        type: 'mcq',
        questionText: 'The chemical formula of water is:',
        options: ['H₂O', 'H₂O₂', 'CO₂', 'NH₃'],
        correctAnswer: 'H₂O',
        marks: 4,
        negativeMarks: 1,
      },
      {
        exam: jeeExam._id,
        examSet: examSet._id,
        section: 'Chemistry',
        type: 'msq',
        questionText: 'Which of the following are noble gases?',
        options: ['Helium', 'Oxygen', 'Neon', 'Argon'],
        correctAnswer: ['Helium', 'Neon', 'Argon'],
        marks: 4,
        negativeMarks: 1,
      },
    ];

    await Question.insertMany(questions);
    console.log(`✓ Created ${questions.length} sample questions`);

    console.log('\n✅ Seed data created successfully!');
    console.log(`   Exam: ${jeeExam.name} (${jeeExam.key})`);
    console.log(`   Exam Set: ${examSet.title}`);
    console.log(`   Questions: ${questions.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run seed
seedData();
