// El Main es el punto de entrada de nuestra aplicación

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  // ejecuta el Módulo principal
  const app = await NestFactory.create(AppModule);

  // configuramos globalmente el prefijo de las API (según "https://pokeapi.co/") 
  app.setGlobalPrefix('api/v2')
  
  // puerto utilizado
  await app.listen(3000);
}
bootstrap();
