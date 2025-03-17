# 📌 Etap 1: Budowanie aplikacji
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# 🛠️ Instalacja MS SQL + netcat
RUN apt-get update && apt-get install -y curl gnupg2 netcat-openbsd \
    && curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o /usr/share/keyrings/microsoft-prod.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/microsoft-prod.gpg] https://packages.microsoft.com/debian/12/prod bookworm main" | tee /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y --no-install-recommends msodbcsql18 mssql-tools18 unixodbc-dev \
    && ln -s /opt/mssql-tools18/bin/sqlcmd /usr/bin/sqlcmd \
    && ln -s /opt/mssql-tools18/bin/bcp /usr/bin/bcp \
    && rm -rf /var/lib/apt/lists/*

# Dodanie `sqlcmd` do PATH
ENV PATH="$PATH:/opt/mssql-tools18/bin"

# ✅ Kopiowanie plików .csproj i restore z wyłączonym pobieraniem równoległym
COPY TimeEngine.API/src/Api/TimeEngine.Api.csproj TimeEngine.API/src/Api/
COPY TimeEngine.API/src/Core/TimeEngine.Core.csproj TimeEngine.API/src/Core/
COPY TimeEngine.API/src/Infrastructure/TimeEngine.Infrastructure.csproj TimeEngine.API/src/Infrastructure/
RUN dotnet restore "TimeEngine.API/src/Api/TimeEngine.Api.csproj" --disable-parallel

# ✅ Kopiowanie całej reszty kodu
COPY . .
WORKDIR "/src/TimeEngine.API/src/Api"

# ✅ Kompilacja i publikacja
RUN dotnet build "TimeEngine.Api.csproj" -c Release -o /app/build
RUN dotnet publish "TimeEngine.Api.csproj" -c Release -o /app/publish

# =============================================================================
# 📌 Etap 2: Finalny obraz
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

# ✅ Instalacja SQLCMD i netcat w finalnym obrazie
RUN apt-get update && apt-get install -y curl gnupg2 netcat-openbsd \
    && curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o /usr/share/keyrings/microsoft-prod.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/microsoft-prod.gpg] https://packages.microsoft.com/debian/12/prod bookworm main" | tee /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y --no-install-recommends msodbcsql18 mssql-tools18 unixodbc-dev \
    && ln -s /opt/mssql-tools18/bin/sqlcmd /usr/bin/sqlcmd \
    && ln -s /opt/mssql-tools18/bin/bcp /usr/bin/bcp \
    && rm -rf /var/lib/apt/lists/*

# ✅ Kopiowanie opublikowanej aplikacji
COPY --from=build /app/publish .

# ✅ Kopiowanie entrypoint.sh i nadanie uprawnień
COPY TimeEngine.API/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# ✅ Start aplikacji
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["dotnet", "TimeEngine.Api.dll"]
