const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Education title/degree is required'],
    trim: true
  },
  firstname: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  completion: {
    type: Date,
    required: [true, 'Completion date is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  }
}, {
  timestamps: true,
  collection: 'educations'
});

module.exports = mongoose.model('Education', EducationSchema);