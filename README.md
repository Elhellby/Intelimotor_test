# 🚗 Intelimotor - Proyecto Seminuevos

Sistema completo para automatizar la publicación de anuncios de vehículos en seminuevos.com, compuesto por un backend con Node.js/Express y un frontend con React.

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Inicio del Proyecto](#inicio-del-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Uso](#uso)
- [Tecnologías](#tecnologías)

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** o **yarn**
- **Google Chrome** (requerido para Puppeteer)
- **Git**

### Verificar instalaciones:

```bash
node --version
npm --version
git --version
```

## 📦 Instalación

1. **Clona el repositorio:**
```bash
git clone <url-del-repositorio>
cd intelimotor
```

2. **Instala las dependencias del backend:**
```bash
cd seminuevos-backend
npm install
```

3. **Instala las dependencias del frontend:**
```bash
cd ../seminuevos-frontend
npm install
```

## ⚙️ Configuración

### Backend (seminuevos-backend)

1. **Navega al directorio del backend:**
```bash
cd seminuevos-backend
```

2. **Crea un archivo `.env` (opcional):**
```bash
# .env
PORT=3001
NODE_ENV=development
```

3. **Verifica que Google Chrome esté instalado:**
   - El proyecto está configurado para usar Chrome en macOS: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
   - Para otros sistemas operativos, ajusta la ruta en `service/puppeteerService.js`

### Frontend (seminuevos-frontend)

1. **Navega al directorio del frontend:**
```bash
cd seminuevos-frontend
```

2. **Configuración de la API (opcional):**
   - El frontend está configurado para conectarse al backend en `http://localhost:3001`
   - Puedes modificar la URL base en `src/services/serviceManager.js`

## 🚀 Inicio del Proyecto

### ⚠️ IMPORTANTE: Orden de Inicio

**Siempre inicia primero el backend y luego el frontend.**

### 1. Iniciar el Backend

```bash
# Navega al directorio del backend
cd seminuevos-backend

# Modo desarrollo (con recarga automática)
npm run dev

# O modo producción
npm start
```

**✅ El backend estará disponible en:** `http://localhost:3001`

**📋 Verificación del backend:**
- Deberías ver mensajes como: "Servidor corriendo en puerto 3001"
- El endpoint `/api/publishCar` estará disponible

### 2. Iniciar el Frontend

```bash
# En una nueva terminal, navega al directorio del frontend
cd seminuevos-frontend

# Inicia la aplicación React
npm start
```

**✅ El frontend estará disponible en:** `http://localhost:3000`

**📋 Verificación del frontend:**
- Se abrirá automáticamente en tu navegador
- Deberías ver la interfaz de usuario de Intelimotor

## 📁 Estructura del Proyecto

```
intelimotor/
├── .gitignore                 # Git ignore consolidado
├── README.md                  # Este archivo
├── seminuevos-backend/        # Backend Node.js/Express
│   ├── index.js              # Servidor principal
│   ├── package.json          # Dependencias del backend
│   ├── service/
│   │   ├── seminuevosService.js  # Lógica de negocio
│   │   └── puppeteerService.js   # Automatización con Puppeteer
│   └── README.md             # Documentación del backend
└── seminuevos-frontend/       # Frontend React
    ├── package.json          # Dependencias del frontend
    ├── public/               # Archivos públicos
    ├── src/                  # Código fuente React
    │   ├── components/       # Componentes React
    │   ├── services/         # Servicios de API
    │   └── App.js           # Componente principal
    └── README.md            # Documentación del frontend
```

## 🎯 Uso

### Endpoint Principal del Backend

**POST** `http://localhost:3001/api/publishCar`

#### Parámetros requeridos:
- `price`: Precio del vehículo (número)
- `description`: Descripción del vehículo (string)

#### Parámetros opcionales:
- `email`: Email para login en seminuevos.com
- `password`: Contraseña para login en seminuevos.com

#### Ejemplo de uso:

```json
{
  "price": 250000,
  "description": "Acura ILX 2018 en excelente estado, mantenimiento al día"
}
```

### Interfaz del Frontend

1. **Abre** `http://localhost:3000` en tu navegador
2. **Llena el formulario** con los datos del vehículo
3. **Haz clic en "Publicar"** para enviar la solicitud al backend
4. **Espera la confirmación** de publicación

## 🛠️ Tecnologías

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **Puppeteer** - Automatización de navegador
- **CORS** - Middleware para CORS
- **Body-parser** - Parsing de JSON
- **Multer** - Manejo de archivos

### Frontend
- **React** - Biblioteca de UI
- **Material-UI** - Componentes de interfaz
- **Axios** - Cliente HTTP
- **React Scripts** - Scripts de desarrollo

## 🔍 Solución de Problemas

### Backend no inicia
- Verifica que el puerto 3001 esté disponible
- Asegúrate de que Google Chrome esté instalado
- Revisa los logs de error en la consola

### Frontend no se conecta al backend
- Verifica que el backend esté corriendo en puerto 3001
- Revisa la configuración de CORS en el backend
- Verifica la URL base en `src/services/serviceManager.js`

### Errores de Puppeteer
- Asegúrate de tener Google Chrome instalado
- Verifica la ruta de Chrome en `service/puppeteerService.js`
- En sistemas Linux, puede necesitar dependencias adicionales

## 📝 Notas Importantes

- **Credenciales**: Si no proporcionas email y password, el sistema ejecutará una simulación
- **Tiempo de ejecución**: La automatización puede tomar varios minutos
- **Chrome**: Es obligatorio tener Google Chrome instalado
- **Puertos**: Backend usa puerto 3001, Frontend usa puerto 3000

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

---

**¡Listo! Tu proyecto Intelimotor debería estar funcionando correctamente.** 🎉
