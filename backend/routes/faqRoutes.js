const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

router.post('/', faqController.createFaq);
router.get('/', faqController.getFaqs);

module.exports = router; 