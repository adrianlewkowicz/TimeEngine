# Wykorzystanie obrazu ASP.NET jako baza
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80

# Wykorzystanie obrazu SDK .NET do budowania aplikacji
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Kopiowanie plików projektowych do odpowiednich katalogów
COPY ["src/Api/TimeEngine.Api.csproj", "src/Api/"]
COPY ["src/Core/TimeEngine.Core.csproj", "src/Core/"]
COPY ["src/Infrastructure/TimeEngine.Infrastructure.csproj", "src/Infrastructure/"]
COPY ["TimeEngine.ML/TimeEngine.ML.csproj", "TimeEngine.ML/"]

# Przywracanie zależności nuget dla głównego projektu API
RUN dotnet restore "src/Api/TimeEngine.Api.csproj"

# Kopiowanie całego kodu źródłowego
COPY . .

# Ustawienie katalogu roboczego na katalog projektu API i budowanie aplikacji
WORKDIR "/src/src/Api"
RUN dotnet build "TimeEngine.Api.csproj" -c Release -o /app/build

# Publikowanie aplikacji
FROM build AS publish
RUN dotnet publish "TimeEngine.Api.csproj" -c Release -o /app/publish

# Tworzenie finalnego obrazu aplikacji z wykorzystaniem obrazu ASP.NET
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Ustawienie punktu wejścia dla kontenera
ENTRYPOINT ["dotnet", "TimeEngine.Api.dll"]
