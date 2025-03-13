# Etap 1: Budowanie aplikacji Angular
FROM node:18-alpine AS build
WORKDIR /app

# Skopiuj pliki package*.json
COPY package*.json ./

# Instaluj zależności
RUN npm install

# Skopiuj resztę aplikacji (wszystkie pliki z bieżącego katalogu)
COPY . ./

# Buduj aplikację
RUN npm run build --configuration=production

# Etap 2: Serwowanie aplikacji za pomocą NGINX
FROM nginx:alpine AS final
WORKDIR /usr/share/nginx/html

# Usuń wszystkie domyślne pliki NGINX
RUN rm -rf ./*
RUN rm -f /etc/nginx/conf.d/*

# Kopiuj zbudowaną aplikację Angulara do NGINX
COPY --from=build /app/dist/timeengine-spa/browser/ /usr/share/nginx/html/

# Kopiuj plik konfiguracyjny NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
