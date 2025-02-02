const express = require('express');
const router = express.Router();
const FAQ = require('../models/Faq');
const { translateText } = require('../services/translationService');

// Get all FAQs with optional language parameter
router.get('/', async (req, res) => {
  try {
    const { lang } = req.query;
    let faqs = await FAQ.find().sort({ createdAt: -1 });
    
    if (lang && lang !== 'en') {
      // Translate FAQs to requested language
      faqs = await Promise.all(faqs.map(async (faq) => {
        const translatedQuestion = await translateText(faq.question, lang);
        const translatedAnswer = await translateText(faq.answer, lang);
        return {
          ...faq._doc,
          question: translatedQuestion,
          answer: translatedAnswer,
          language: lang
        };
      }));
    }
    
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single FAQ
router.get('/:id', async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.json(faq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new FAQ
router.post('/', async (req, res) => {
  try {
    const faq = new FAQ({
      question: req.body.question,
      answer: req.body.answer,
      language: req.body.language || 'en'
    });
    const newFaq = await faq.save();
    res.status(201).json(newFaq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update FAQ
router.put('/:id', async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    
    faq.question = req.body.question;
    faq.answer = req.body.answer;
    faq.language = req.body.language || faq.language;
    
    const updatedFaq = await faq.save();
    res.json(updatedFaq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete FAQ
router.delete('/:id', async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    await faq.deleteOne(); // Using deleteOne instead of remove as it's deprecated
    res.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 