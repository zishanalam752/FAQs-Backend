const { Translate } = require('@google-cloud/translate').v2;

// Initialize the Google Cloud Translation client with explicit credentials
const translate = new Translate({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: require('../../faq-credential.json'), // Load credentials directly
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

const translateText = async (text, targetLang) => {
  try {
    if (!text) return '';
    
    // Add authentication check
    const [languages] = await translate.getLanguages();
    if (!languages) {
      throw new Error('Failed to authenticate with Google Cloud');
    }

    const [translation] = await translate.translate(text, targetLang);
    return translation;
  } catch (error) {
    console.error('Translation error:', error);
    // More detailed error message
    if (error.code === 403) {
      throw new Error('Authentication failed with Google Cloud. Please check your credentials and API access.');
    }
    throw new Error(`Translation failed: ${error.message}`);
  }
};
//
const translateFaq = async (question, answer, targetLang) => {
  try {
    const [translatedQuestion, translatedAnswer] = await Promise.all([
      translateText(question, targetLang),
      translateText(answer, targetLang)
    ]);

    return {
      language: targetLang,
      question: translatedQuestion,
      answer: translatedAnswer
    };
  } catch (error) {
    console.error('FAQ translation error:', error);
    throw new Error(`FAQ translation failed: ${error.message}`);
  }
};

module.exports = {
  translateText,
  translateFaq
}; 