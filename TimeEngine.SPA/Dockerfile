# Etap 1: Budowanie aplikacji Angular
FROM node:18-alpine AS build
WORKDIR /app

# Skopiuj cały projekt do katalogu /app
COPY . /app
RUN npm install

# Buduj aplikację
RUN npm run build --configuration=production

# (Opcjonalnie: sprawdź, czy folder został utworzony)
RUN ls -la /app/dist/time-engine-app

# Etap 2: Serwowanie aplikacji za pomocą NGINX
FROM nginx:alpine AS final
WORKDIR /usr/share/nginx/html

# Usuń wszystkie domyślne pliki Nginx
RUN rm -rf ./*
RUN rm -f /etc/nginx/conf.d/*

# Kopiuj zawartość katalogu "browser" z etapu build do katalogu Nginx (zwróć uwagę na końcowy ukośnik)
COPY --from=build /app/dist/time-engine-app/browser/ /usr/share/nginx/html/

# Kopiuj plik konfiguracyjny nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

