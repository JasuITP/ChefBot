# Mercado Sabor - AI Food Marketplace MVP

Este proyecto es un prototipo (MVP) de un marketplace de comida impulsado por IA. Permite a los usuarios describir lo que les apetece comer, y utiliza la API de Google Gemini para analizar el inventario de platos y ofrecer recomendaciones personalizadas.

## Demo
![Mercado Sabor Demo](https://storage.googleapis.com/gen-ai-screenshots/mercado-sabor-demo.gif)

## Stack de Tecnología

- **Frontend:** React 19
- **UI:** Tailwind CSS (cargado vía CDN para simplicidad)
- **Routing:** React Router
- **State Management:** React Context API
- **IA:** Google Gemini API (`gemini-2.5-flash`)
- **Iconos:** Google Material Symbols

## Pre-requisitos

Antes de comenzar, asegúrate de tener instalado el siguiente software en tu máquina:

- [Node.js](https://nodejs.org/) (versión 18.x o superior recomendada)
- npm (normalmente se instala junto con Node.js)
- Un editor de código como [Visual Studio Code](https://code.visualstudio.com/)

## Guía de Instalación y Ejecución

Sigue estos pasos para levantar el proyecto en tu computadora personal.

### 1. Clona el Repositorio (o descarga los archivos)

Si estás usando git, clona el repositorio en tu máquina local. De lo contrario, simplemente descarga y descomprime los archivos del proyecto en una carpeta.

```bash
# Reemplaza <repository-url> con la URL de tu repositorio
git clone <repository-url>
cd nombre-del-directorio
```

### 2. Configura tu Clave de API de Gemini

La aplicación necesita una clave de API para comunicarse con el servicio de IA de Google y generar las recomendaciones de comida.

1.  **Obtén una clave de API:** Ve a [Google AI Studio](https://aistudio.google.com/app/apikey) y crea una nueva clave de API.

2.  **Configura la clave en la aplicación:**
    Este proyecto está diseñado para ser ejecutado en un entorno donde la variable de entorno `process.env.API_KEY` está disponible. Para el desarrollo local con un servidor estático simple, puedes hacer lo siguiente:
    - Abre el archivo `services/geminiService.ts`.
    - Busca la línea: `const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "mock_key" });`
    - **Para pruebas locales**, reemplaza `process.env.API_KEY` directamente con tu clave:
      ```typescript
      // services/geminiService.ts

      // ANTES:
      // const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "mock_key" });

      // DESPUÉS (reemplaza TU_API_KEY_AQUI con tu clave real):
      const ai = new GoogleGenAI({ apiKey: "TU_API_KEY_AQUI" });
      ```

> **IMPORTANTE:** Nunca subas tu clave de API a un repositorio público (como GitHub). El método anterior es **solo para desarrollo local**. En un entorno de producción, la clave debe ser gestionada de forma segura.

### 3. Inicia el Servidor de Desarrollo

Este proyecto no requiere un proceso de compilación complejo (como Webpack o Vite). Los archivos son estáticos y se pueden servir directamente. La forma más sencilla de hacerlo es con el paquete `serve` de npm.

1.  Abre una terminal en la raíz del directorio de tu proyecto.
2.  Ejecuta el siguiente comando para iniciar un servidor web local:

    ```bash
    npx serve .
    ```

3.  La terminal te mostrará una o más URLs. Generalmente, podrás acceder a la aplicación abriendo tu navegador y visitando:

    **[http://localhost:3000](http://localhost:3000)**

¡Y listo! Ahora deberías ver la aplicación "Mercado Sabor" funcionando en tu navegador. Puedes probar el buscador de IA para obtener recomendaciones.

## Estructura del Proyecto

```
/
├── components/       # Componentes reutilizables de React (Botones, Cards, etc.)
├── context/          # Contexto de React para el estado global (carrito, pedidos)
├── pages/            # Componentes que representan páginas completas (Inicio, Checkout)
├── services/         # Lógica para interactuar con APIs externas (Gemini AI)
├── types.ts          # Definiciones de TypeScript (Product, CartItem, etc.)
├── constants.ts      # Datos constantes como el inventario de productos
├── App.tsx           # Componente principal que define las rutas
├── index.html        # El archivo HTML principal
├── index.tsx         # El punto de entrada de la aplicación React
└── README.md         # Este archivo
```

## Nota sobre Docker y Backend

La solicitud original mencionaba una arquitectura completa con Node.js, MySQL y Docker. Esta versión actual es un **MVP enfocado exclusivamente en el frontend** para demostrar la experiencia del usuario y la interacción con la IA.

Para una versión futura, los siguientes pasos serían:

1.  **Desarrollar un Backend:** Crear una API REST con Node.js y Express.
2.  **Base de Datos:** Diseñar y conectar una base de datos (como MySQL o PostgreSQL) para persistir productos, usuarios y órdenes.
3.  **Contenerización:** Crear un `Dockerfile` para la aplicación frontend, otro para el backend, y un archivo `docker-compose.yml` para orquestar los servicios y la base de datos, facilitando el despliegue.
