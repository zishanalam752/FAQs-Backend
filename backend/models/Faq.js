const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'en',
    enum: ['en', 'es', 'fr', 'de', 'hi'] // supported languages
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FAQ', faqSchema); 