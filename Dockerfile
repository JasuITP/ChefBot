# Utiliza una imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package.json package-lock.json* ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Compila la app con Vite
RUN npm run build

# Instala 'serve' globalmente para servir la carpeta de build
RUN npm install -g serve

# Expone el puerto 3000
EXPOSE 3000

# Sirve la carpeta de build generada por Vite
CMD ["serve", "dist", "-l", "3000"]
