// El Main es el punto de entrada de nuestra aplicación

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  // ejecuta el Módulo principal
  const app = await NestFactory.create(AppModule);

  // configuramos globalmente el prefijo de las API (según "https://pokeapi.co/") 
  app.setGlobalPrefix('api/v2');

  // utilizamos los PIPES a nivel global para validar la forma de los DTO 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
      }),
  );
  
  // puerto utilizado definido en las variables de entorno (".env")
  await app.listen(process.env.PORT);
}
bootstrap();
