# Etap 1: Budowanie aplikacji Angular
FROM node:18-alpine AS build
WORKDIR /app

# Skopiuj pliki package*.json
COPY package*.json ./

# Instaluj zależności
RUN npm install

# Skopiuj resztę aplikacji
COPY . .

# Buduj aplikację
RUN npm run build --configuration=production

# sprawdź poprawną nazwę folderu (opcjonalnie do debugowania)
RUN ls -la /app/dist/timeengine-spa

# Etap 2: Serwowanie aplikacji za pomocą NGINX
FROM nginx:alpine AS final
WORKDIR /usr/share/nginx/html

# Usuń wszystkie domyślne pliki Nginx
RUN rm -rf ./*
RUN rm -f /etc/nginx/conf.d/*

# Kopiuj zbudowaną aplikację (poprawiona ścieżka)
COPY --from=build /app/dist/timeengine-spa/ /usr/share/nginx/html/

# Kopiuj plik konfiguracyjny Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
