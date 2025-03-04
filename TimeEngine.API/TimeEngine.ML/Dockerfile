# Dockerfile for TimeEngine.ML (Python ML Module)
FROM python:3.10

WORKDIR /app

# Skopiowanie pliku requirements.txt
COPY TimeEngine.ML/requirements.txt /app/requirements.txt

# Instalacja zależności Pythona
RUN pip install --upgrade pip \
    && pip install -r /app/requirements.txt

# Skopiowanie całej aplikacji do katalogu roboczego
COPY TimeEngine.ML /app

# Wystawienie portu, na którym działa aplikacja ML
EXPOSE 5001

# Uruchomienie serwisu ML z poprawną ścieżką
CMD ["python", "/app/Services/model_service.py"]
