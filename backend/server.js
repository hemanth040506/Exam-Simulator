const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exams');
const examAttemptRoutes = require('./routes/examAttempts');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend is running',
  });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Exam read-only routes
app.use('/api', examRoutes);

// Exam attempt routes (protected)
app.use('/api/exam-attempts', examAttemptRoutes);

// Start server only after DB connection attempt
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});

