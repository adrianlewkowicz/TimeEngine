# Etap 1: Budowanie aplikacji Angular
FROM node:18-alpine AS build
WORKDIR /app

# Skopiuj pliki package*.json
COPY TimeEngine.SPA/package*.json ./

# Instaluj zależności
RUN npm install

# Skopiuj resztę aplikacji
COPY TimeEngine.SPA ./

# Buduj aplikację
RUN npm run build --configuration=production

# Etap 2: Serwowanie aplikacji za pomocą NGINX
FROM nginx:alpine AS final
WORKDIR /usr/share/nginx/html

# Usuń wszystkie domyślne pliki Nginx
RUN rm -rf ./*
RUN rm -f /etc/nginx/conf.d/*

# Kopiuj zbudowaną aplikację Angulara do Nginx
COPY --from=build /app/dist/timeengine-spa/browser/ /usr/share/nginx/html/

# Kopiuj plik konfiguracyjny Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
