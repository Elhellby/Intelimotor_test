/**
 * Service to handle used car related operations
 */
const PuppeteerService = require('./puppeteerService');


/**
 * Publish a used car
 * @param {number} price - Price of the car
 * @param {string} description - Description of the car
 * @returns {Promise<Object>} - Result of the publication
 */
async function publishCar(price, description) {
  try {
    const carData = {
        "tipo": "autos",
        "marca": "Acura",
        "modelo": "ILX",
        "version": "2.4 Tech At",
        "subtipo": "Sedán",
        "anio": 2018,
        "color": "Negro",
        "estado": "Nuevo León",
        "ciudad_delegacion": "Monterrey",
        "cp": "55767",
        "recorrido": "20000",
        "precio": price,
        "transaccion": "Negociable",
        "descripcion": description,
        "imagenes": [
          "./images/image_1.png",
          "./images/image_2.png",
          "./images/image_3.png"
        ],
        "paquete": "Free"
      }

      console.log(carData, "<===== carData");
    
        const puppeteerService = new PuppeteerService();
        await puppeteerService.completePublishProcess(carData, "aleteck.214@gmail.com", "*G8K4G7XveB6qT8");
    
    return {
      success: true,
      carId: carData.id,
      message: 'Carro publicado exitosamente'
    };
    
  } catch (error) {
    console.error('Error en publishCar:', error);
    throw new Error(error.message);
  }
}

module.exports = {
  publishCar,
};
        