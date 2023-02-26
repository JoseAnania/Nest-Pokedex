<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en Desarrollo

1. Clonar el repositorio
2. Ejecutar
```
npm install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la BD
```
docker-compose up -d
```
5. Ejecutar la aplicación en dev
```
npm run start:dev
```
6. Clonar el archivo __.env.template__ y renombrar a __.env__

7. Reconstruir la BD con la semilla (Seed)
```
http://localhost:3000/api/v2/seed
```

# Production Build
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de producción
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```


# Stack usado
* MongoDB
* Nest
* Docker

