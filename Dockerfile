# 1. Base image
FROM node:20-alpine AS builder

# 2. Çalışma dizini
WORKDIR /app

# 3. Package dosyalarını kopyala
COPY package*.json ./

# 4. Bağımlılıkları yükle
RUN npm install 

# 5. Proje dosyalarını kopyala
COPY . .

# 6. Build al
RUN npm run build

# 7. Port
EXPOSE 6529

# 8. Uygulamayı başlat
CMD ["npm", "start"]
