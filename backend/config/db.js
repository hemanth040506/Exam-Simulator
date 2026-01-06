const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('MONGO_URI is not defined in environment variables');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      // These options are defaults in newer mongoose versions but kept
      // here for clarity and future compatibility.
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

