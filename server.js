const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const config = require("./config/config.js")

// Import route files
const contactRoutes = require('./server/routes/contact.routes');
const projectRoutes = require('./server/routes/project.routes');
const educationRoutes = require('./server/routes/education.routes');
const userRoutes = require('./server/routes/user.routes');
const authRoutes = require('./server/routes/auth.route');

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors({ origin: process.env.CLIENT_ORIGIN || true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection URI (Update if using MongoDB Atlas)
const MONGODB_URI = config.MONGODB_URI; // || 'mongodb://127.0.0.1:27017/Portfolio';

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

app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/educations', educationRoutes);
app.use('/api/users', userRoutes);
app.use('/api', authRoutes);

// Serve the Vite production build from the same origin as the API.
const clientBuildPath = path.join(__dirname, 'client', 'dist');
app.use(express.static(clientBuildPath));
app.get(/^\/(?!api(?:\/|$)).*/, (req, res, next) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'), (error) => {
    if (error) next(error);
  });
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Authentication required.' });
  }
  console.error(err);
  return res.status(500).json({ error: 'An unexpected server error occurred.' });
});

// Define Port and Start Server
const PORT = process.env.PORT || 5186;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
