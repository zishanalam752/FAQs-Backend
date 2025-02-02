const Faq = require('../models/Faq');
const { translateFaq } = require('../services/translationService');
const cache = require('../utils/cache');

const SUPPORTED_LANGUAGES = ['en', 'hi', 'bn'];

exports.createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;
    
    // Create translations for all supported languages
    const translationPromises = SUPPORTED_LANGUAGES.map(async (lang) => {
      if (lang === 'en') {
        return {
          language: 'en',
          question,
          answer
        };
      }
      return await translateFaq(question, answer, lang);
    });

    const translations = await Promise.all(translationPromises);
    
    const faq = new Faq({ translations });
    await faq.save();

    // Invalidate cache for all languages
    await Promise.all(
      SUPPORTED_LANGUAGES.map(lang => cache.invalidate(`faqs:${lang}`))
    );

    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFaqs = async (req, res) => {
  try {
    const lang = req.query.lang || 'en';
    
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      return res.status(400).json({ error: 'Unsupported language' });
    }

    // Try to get FAQs from cache
    const cachedFaqs = await cache.get(`faqs:${lang}`);
    if (cachedFaqs) {
      return res.json(cachedFaqs);
    }

    // If not in cache, get from database
    const faqs = await Faq.find();
    const localizedFaqs = faqs.map(faq => {
      const translation = faq.translations.find(t => t.language === lang);
      return {
        id: faq._id,
        question: translation.question,
        answer: translation.answer,
        language: translation.language
      };
    });

    // Cache the results
    await cache.set(`faqs:${lang}`, localizedFaqs);

    res.json(localizedFaqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 