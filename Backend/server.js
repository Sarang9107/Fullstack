const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../Frontend/Demo/dist')));
}

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myapp')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Basic route - fallback to index.html for React routing in production
app.get('/', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '../Frontend/Demo/dist/index.html'));
  } else {
    res.json({ message: 'Server is running!' });
  }
});

// API endpoint for frontend
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Project Lab User',
    rollNumber: 'RBT23CS010'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
