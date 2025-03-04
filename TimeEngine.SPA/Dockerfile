# Etap 1: Budowanie aplikacji Angular
FROM node:18-alpine AS build

WORKDIR /app

# Kopiowanie plików package.json oraz package-lock.json i instalacja zależności
COPY package*.json ./
RUN npm install

# Kopiowanie wszystkich plików aplikacji Angular
COPY . .

# Budowanie aplikacji Angular z konfiguracją produkcyjną
RUN npm run build --configuration=production

# Etap 2: Serwowanie aplikacji za pomocą NGINX
FROM nginx:alpine AS final

# Ustawienie katalogu roboczego
WORKDIR /usr/share/nginx/html

# Kopiowanie plików skompilowanej aplikacji Angular do NGINX
COPY --from=build /app/dist/time-engine-app /usr/share/nginx/html

# Kopiowanie pliku konfiguracyjnego Nginx do odpowiedniego katalogu
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Wystawienie portu aplikacji
EXPOSE 80

# Uruchomienie NGINX
CMD ["nginx", "-g", "daemon off;"]
