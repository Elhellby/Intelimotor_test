# Seminuevos Backend

Backend para automatizar la publicación de anuncios en seminuevos.com usando Puppeteer.

## Características

- Endpoint único: `/api/publishCar`
- Automatización con Puppeteer para navegar a seminuevos.com
- Login automático con credenciales
- Publicación automática de anuncios de carros
- Modo headless para ejecución en servidor

## Instalación

```bash
npm install
```

## Configuración

1. Asegúrate de tener Google Chrome instalado en tu sistema
2. El servicio está configurado para usar Chrome en macOS: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`

## Uso

### Iniciar el servidor

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor se ejecutará en el puerto 3001.

### Endpoint de publicación

**POST** `/api/publishCar`

#### Parámetros requeridos:
- `price`: Precio del carro (número)
- `description`: Descripción del carro (string)

#### Parámetros opcionales (para automatización):
- `email`: Email para login en seminuevos.com
- `password`: Contraseña para login en seminuevos.com

#### Ejemplo de petición:

```json
{
  "price": 250000,
  "description": "Acura ILX 2018 en excelente estado, mantenimiento al día, sin accidentes",
  "email": "tu-email@ejemplo.com",
  "password": "tu-password"
}
```

#### Respuesta exitosa:

```json
{
  "success": true,
  "message": "Anuncio publicado correctamente",
  "data": {
    "price": 250000,
    "description": "Acura ILX 2018 en excelente estado...",
    "email": "tu-email@ejemplo.com"
  }
}
```

## Proceso de automatización

Cuando se proporcionan credenciales (`email` y `password`), el sistema:

1. **Abre un navegador Chrome en modo headless**
2. **Navega a seminuevos.com**
3. **Inicia sesión** con las credenciales proporcionadas
4. **Busca el botón "Vende tu auto"** y hace clic
5. **Llena el formulario** con los datos del carro:
   - Tipo: Autos
   - Marca: Acura
   - Modelo: ILX
   - Subtipo: Sedán
   - Año: 2018
   - Estado: Nuevo León
   - Ciudad: Monterrey
   - Kilometraje: 20000 kms
   - Precio: El proporcionado
   - Transacción: Negociable
   - Descripción: La proporcionada
6. **Envía el formulario**
7. **Espera confirmación** de publicación
8. **Cierra el navegador**

## Pruebas

Para probar el endpoint, puedes usar el archivo de prueba incluido:

```bash
# Edita test-publish.js con tus credenciales reales
node test-publish.js
```

## Notas importantes

- **Credenciales**: Si no proporcionas `email` y `password`, el sistema ejecutará una simulación sin automatización
- **Chrome**: Asegúrate de tener Google Chrome instalado
- **Tiempo de ejecución**: El proceso de automatización puede tomar varios minutos
- **Errores**: El sistema maneja errores y proporciona mensajes descriptivos

## Estructura del proyecto

```
seminuevos-backend/
├── index.js                 # Servidor principal
├── service/
│   ├── seminuevosService.js # Lógica de negocio
│   └── puppeteerService.js  # Automatización con Puppeteer
├── test-publish.js          # Archivo de prueba
└── package.json
```

## Dependencias principales

- `express`: Servidor web
- `puppeteer`: Automatización de navegador
- `cors`: Middleware para CORS
- `body-parser`: Parsing de JSON
- `dotenv`: Variables de entorno
