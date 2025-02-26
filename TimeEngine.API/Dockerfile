FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["TimeEngine.API/TimeEngine.API.csproj", "TimeEngine.API/"]
RUN dotnet restore "TimeEngine.API/TimeEngine.API.csproj"
COPY . .
RUN dotnet publish "TimeEngine.API/TimeEngine.API.csproj" -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "TimeEngine.API.dll"]
