const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require("config/config.js")

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection URI (Update if using MongoDB Atlas)
const MONGODB_URI = config.MONGODB_URI || 'mongodb://127.0.0.1:27017/Portfolio';

// Connect to MongoDB using Mongoose
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB database: Portfolio');
})
.catch((error) => {
  console.error('Database connection error:', error);
  process.exit(1);
});

// Root Endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the MyPortfolio API server!' });
});

// Import route files
const contactRoutes = require('./routes/contact.routes');
const projectRoutes = require('./routes/project.routes');
const educationRoutes = require('./routes/education.routes');
const userRoutes = require('./routes/user.routes');

app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/educations', educationRoutes);
app.use('/api/users', userRoutes);

// Define Port and Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});