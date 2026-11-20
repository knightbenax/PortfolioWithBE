const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  type: { type: String, trim: true, default: '' },
  role: { type: String, trim: true, default: '' },
  outcome: { type: String, trim: true, default: '' },
  icon: { type: String, trim: true, default: '' }
}, {
  timestamps: true,
  collection: 'projects'
});

module.exports = mongoose.model('Project', ProjectSchema);
