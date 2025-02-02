import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FaqList from './components/FaqList';
import FaqForm from './components/FaqForm';
import { 
  Container, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Stack 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ mb: 4 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FAQ Management
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button 
                color="inherit" 
                component={Link} 
                to="/"
                startIcon={<HomeIcon />}
              >
                Home
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/add"
                startIcon={<AddIcon />}
              >
                Add FAQ
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<FaqList />} />
            <Route path="/add" element={<FaqForm />} />
            <Route path="/edit/:id" element={<FaqForm />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App; 