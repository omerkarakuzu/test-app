# Test App

Bu proje Next.js ile oluşturulmuş bir web uygulamasıdır.

## Kurulum ve Çalıştırma

### Geliştirme Ortamı
```bash
pnpm install
pnpm dev
```

### Docker ile Çalıştırma

1. Docker imajını oluşturun:
```bash
docker build -t test-app .
```

2. Uygulamayı çalıştırın:
```bash
docker run -p 3000:3000 test-app
```

### Docker Compose ile Çalıştırma

```bash
docker-compose up --build
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## Yapılandırma

- Next.js 16
- TypeScript
- Tailwind CSS
- Radix UI bileşenleri