import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper
} from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const FaqForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    language: 'en'
  });

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'hi', name: 'Hindi' }
  ];

  useEffect(() => {
    if (id) {
      fetchFaq();
    }
  }, [id]);

  const fetchFaq = async () => {
    try {
      const response = await axios.get(`${API_URL}/faqs/${id}`);
      setFormData({
        question: response.data.question,
        answer: response.data.answer,
        language: response.data.language || 'en'
      });
    } catch (error) {
      console.error('Error fetching FAQ:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`${API_URL}/faqs/${id}`, formData);
      } else {
        await axios.post(`${API_URL}/faqs`, formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving FAQ:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            {id ? 'Edit FAQ' : 'Add New FAQ'}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="language-label">
              <TranslateIcon sx={{ mr: 1 }} />
              Language
            </InputLabel>
            <Select
              labelId="language-label"
              name="language"
              value={formData.language}
              onChange={handleChange}
              label="Language"
            >
              {languages.map((lang) => (
                <MenuItem key={lang.code} value={lang.code}>
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={2}
          />

          <TextField
            fullWidth
            label="Answer"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={4}
          />

          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<SaveIcon />}
              sx={{
                '&:hover': {
                  color: 'black',
                  backgroundColor: '#1565c0'
                }
              }}
            >
              {id ? 'Update FAQ' : 'Save FAQ'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              startIcon={<ArrowBackIcon />}
              sx={{
                '&:hover': {
                  color: 'black',
                  borderColor: '#1565c0',
                  backgroundColor: 'rgba(21, 101, 192, 0.04)'
                }
              }}
            >
              Back to List
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default FaqForm; 