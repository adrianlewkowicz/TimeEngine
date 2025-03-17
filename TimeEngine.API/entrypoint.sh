#!/bin/bash
set -e

DB_HOST="db"
DB_PORT="1433"
MAX_RETRIES=60
SLEEP_TIME=2

echo "📡 Czekam na bazę danych (${DB_HOST}:${DB_PORT})..."
for i in $(seq 1 $MAX_RETRIES); do
  if nc -z "$DB_HOST" "$DB_PORT"; then
    echo "✅ Baza danych dostępna! Uruchamiam API..."
    exec "$@"
  fi
  echo "⏳ Czekam... Próba $i/$MAX_RETRIES"
  sleep $SLEEP_TIME
done

echo "❌ Baza danych nie uruchomiła się po $MAX_RETRIES próbach. Zatrzymuję proces."
exit 1
