#!/bin/bash

echo "Przechodzę do katalogu projektu Shober..."
cd /ścieżka/do/Shober

echo "Pobieranie najnowszych zmian z Gita..."
git pull

echo "Budowanie i aktualizacja kontenerów Docker..."
docker-compose down
docker-compose up --build -d

echo "Czyszczenie nieużywanych zasobów Docker..."
docker system prune -f

echo "Zakończono aktualizację!"
