import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const FaqList = () => {
  const [faqs, setFaqs] = useState([]);
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(true);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' }
  ];

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/faqs?lang=${language}`);
        setFaqs(response.data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, [language]);

  return (
    <div className="faq-container">
      <div className="language-selector">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="faq-list">
          {faqs.map(faq => (
            <div key={faq.id} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FaqList; 