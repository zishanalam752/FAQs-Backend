const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ['en', 'hi', 'bn'] // English, Hindi, Bengali
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

const faqSchema = new mongoose.Schema({
  translations: [translationSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Faq', faqSchema); 