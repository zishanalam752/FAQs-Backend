import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Try the default Express port 3000 or 5000
const API_URL = 'http://localhost:3000/api';

const FaqForm = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      console.log('Attempting to connect to:', `${API_URL}/faqs`);
      
      const response = await axios.post(`${API_URL}/faqs`, {
        question,
        answer
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: false,
        // Add timeout to get faster error feedback
        timeout: 5000
      });

      if (response.status === 200 || response.status === 201) {
        setQuestion('');
        setAnswer('');
        alert('FAQ created successfully!');
      }
    } catch (error) {
      console.error('Full error details:', error);
      
      if (error.code === 'ERR_NETWORK') {
        alert('Backend server is not running. Please start the backend server on port 5000.');
      } else if (error.response?.status === 404) {
        alert('API endpoint not found. Please check the backend URL and routes.');
      } else if (error.response?.status === 500) {
        alert('Server error. Please check backend logs.');
      } else {
        alert(`Error creating FAQ: ${error.response?.data?.message || error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="faq-form">
      <div className="form-group">
        <label>Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Answer:</label>
        <ReactQuill
          value={answer}
          onChange={setAnswer}
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline'],
              ['link'],
              [{ list: 'ordered' }, { list: 'bullet' }]
            ]
          }}
        />
      </div>

      <button type="submit" disabled={loading} className="btn btn-primary">
        {loading ? 'Creating...' : 'Create FAQ'}
      </button>
    </form>
  );
};

export default FaqForm; 