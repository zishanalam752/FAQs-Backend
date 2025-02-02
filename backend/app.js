const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const faqRoutes = require('./routes/faqRoutes');
const dotenv = require('dotenv');
const app = express();
dotenv.config({
  path :'../.env'
});

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3001', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/faqs', faqRoutes);

// FAQ routes
app.post('/api/faqs', async (req, res) => {
    try {
        const { question, answer } = req.body;
        // Your FAQ creation logic here
        res.status(201).json({ message: 'FAQ created successfully' });
    } catch (error) {
        console.error('Error creating FAQ:', error);
        res.status(500).json({ message: 'Error creating FAQ' });
    }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/faq-system')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 