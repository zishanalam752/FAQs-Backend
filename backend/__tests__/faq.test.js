const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Faq = require('../models/Faq');
const cache = require('../utils/cache');
const dotenv = require('dotenv');
dotenv.config({
  path: '.../.env'
});
describe('FAQ API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/faq-system-test');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Faq.deleteMany();
    await cache.invalidate('faqs:en');
  });

  describe('POST /api/faqs', () => {
    it('should create a new FAQ with translations', async () => {
      const response = await request(app)
        .post('/api/faqs')
        .send({
          question: 'Test question?',
          answer: 'Test answer'
        });

      expect(response.status).toBe(201);
      expect(response.body.translations).toHaveLength(3);
      expect(response.body.translations[0].language).toBe('en');
    });
  });

  describe('GET /api/faqs', () => {
    it('should return FAQs in requested language', async () => {
      const faq = await Faq.create({
        translations: [
          { language: 'en', question: 'Test?', answer: 'Test' },
          { language: 'hi', question: 'परीक्षण?', answer: 'परीक्षण' }
        ]
      });

      const response = await request(app)
        .get('/api/faqs?lang=hi');

      expect(response.status).toBe(200);
      expect(response.body[0].question).toBe('परीक्षण?');
    });
  });
}); 