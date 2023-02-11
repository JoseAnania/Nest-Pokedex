// Los Módulos agrupan un conjunto de funcionalidad específica por dominio. Este es el módulo principal o root (aquí estará la definición de todos los submódulos)

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({

  imports: [

    // importamos el servicio del Contenido Estático
    ServeStaticModule.forRoot({rootPath: join(__dirname,'..','public'),}),

    // importamos el servicio de Pokemon
    PokemonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
