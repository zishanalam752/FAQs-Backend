import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Select, 
  MenuItem, 
  Box,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const FaqList = () => {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'hi', name: 'Hindi' }
  ];

  useEffect(() => {
    fetchFaqs();
  }, [selectedLanguage]);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get(`${API_URL}/faqs?lang=${selectedLanguage}`);
      setFaqs(response.data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/faqs/${id}`);
      fetchFaqs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Frequently Asked Questions
        </Typography>
        <Select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          size="small"
        >
          {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {faqs.map((faq) => (
        <Card key={faq._id} sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" component="h2">
                {faq.question}
              </Typography>
              <Box>
                <IconButton onClick={() => handleEdit(faq._id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(faq._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {faq.answer}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default FaqList; 