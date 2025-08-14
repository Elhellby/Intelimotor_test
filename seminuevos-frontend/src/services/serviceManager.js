import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_API,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const publicationsService = {
  createPublication: async (datos) => {
    try {
      const response = await axiosInstance.post('/api/publishCar', datos);
      return response.data;
    } catch (error) {
      throw new Error('Error al crear el anuncio: ' + error.message);
    }
  },
};
