const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const seminuevosService = require('./service/seminuevosService');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/publishCar',async (req, res) => {
  try {
    const carData = req.body;
    
    if (!carData || Object.keys(carData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Datos del carro son requeridos'
      });
    }
    
    if (!carData.price || !carData.description) {
      return res.status(400).json({
        success: false,
        message: 'El precio y la descripción son campos obligatorios'
      });
    }

    const response = await seminuevosService.publishCar(
      carData.price, 
      carData.description, 
    );
    
    res.status(200).json({
      success: true,
      message: 'Carro publicado exitosamente',
      data: {
        imagePath: response,
        base64: fs.readFileSync(response, { encoding: 'base64' })
      }
    });
    
  } catch (error) {
    console.error('Error al publicar carro:', error);
    res.status(500).json({
      success: false,
      message: 'Servicio no disponible, por favor intente más tarde'
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
