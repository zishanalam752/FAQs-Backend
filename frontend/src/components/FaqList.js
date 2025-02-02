import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  IconButton, 
  Select, 
  MenuItem,
  Paper
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import '../styles/FaqList.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const FaqItem = ({ faq, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="faq-card"
    >
      <Paper 
        elevation={2} 
        className={`faq-item ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Box className="faq-header">
          <Typography 
            variant="h6" 
            className="faq-question"
            sx={{ 
              fontWeight: 600,
              color: '#2c3e50',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <KeyboardArrowDownIcon />
            {faq.question}
          </Typography>
          <Box className="faq-actions">
            <IconButton onClick={(e) => {
              e.stopPropagation();
              onEdit(faq._id);
            }}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={(e) => {
              e.stopPropagation();
              onDelete(faq._id);
            }}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        </Box>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="faq-answer"
            >
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#34495e',
                  lineHeight: 1.6,
                  mt: 2
                }}
              >
                {faq.answer}
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>
    </motion.div>
  );
};

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
        <FaqItem key={faq._id} faq={faq} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
    </Container>
  );
};

export default FaqList; 