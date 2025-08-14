import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
} from '@mui/material';
import './App.css';
import { publicationsService } from './services/serviceManager';
import SpinLoader from './components/spinLoader';
import PopupMessage from './components/PopupMessage';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    price: '',
    description: ''
  });
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [open, setOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Datos del formulario:', formData);
    try {
      const response = await publicationsService.createPublication(formData);
      console.log('Respuesta del servidor:', response);
      setMessage('Anuncio publicado exitosamente!');
      setSeverity('success');
      setOpen(true);
    } catch (error) {
      console.error('Error al publicar el anuncio:', error);
      setMessage('Error al publicar el anuncio. Por favor, intenta nuevamente.');
      setSeverity('error');
      setOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <Container maxWidth="sm" className="main-container">
        <Box sx={{ mt: 3, mb: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom align="center" className="title">
            Publicar Anuncio
          </Typography>
          
          <Paper elevation={0} className="form-paper">
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Precio"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                margin="normal"
                required
                className="form-field"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                placeholder="0.00"
              />
              
              <TextField
                fullWidth
                label="Descripción"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                margin="normal"
                required
                className="form-field"
                placeholder="Describe tu vehículo..."
              />
              
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  className="submit-button"
                >
                  Publicar Anuncio
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      </Container>
      <SpinLoader isLoading={isLoading} text="Publicando anuncio..." />
      <PopupMessage 
        open={open}
        message={message}
        severity={severity}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

export default App;
