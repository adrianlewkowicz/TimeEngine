FROM python:3.11-slim

WORKDIR /app

# Kopiowanie pliku wymagań i instalacja bibliotek
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Kopiowanie całego katalogu z aplikacją
COPY . .

# Ekspozycja portu dla FastAPI
EXPOSE 8000

# Start aplikacji FastAPI za pomocą Uvicorn
CMD ["uvicorn", "model_service:app", "--host", "0.0.0.0", "--port", "8000"]
