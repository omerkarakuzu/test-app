# ---------- BUILD STAGE ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Next + PostCSS + Tailwind için gerekli paketler
RUN apk add --no-cache \
  libc6-compat \
  python3 \
  make \
  g++ \
  git

ENV NEXT_TELEMETRY_DISABLED=1

COPY package*.json ./

# Lock dosyası varsa deterministik kurulum yapar
RUN npm ci

COPY . .

# Next.js üretim derlemesi
RUN npm run build


# ---------- RUNTIME STAGE ----------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Sadece gerekli çıktıları kopyala
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

USER node

CMD ["npm", "start"]
