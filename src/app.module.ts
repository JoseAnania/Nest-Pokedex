// Los Módulos agrupan un conjunto de funcionalidad específica por dominio. Este es el módulo principal o root (aquí estará la definición de todos los submódulos)

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({

  imports: [

    // importamos el servicio del Contenido Estático
    ServeStaticModule.forRoot({rootPath: join(__dirname,'..','public'),}),

    // importamos el servicio de conexión a la BD (Mongo)
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),

    // importamos el servicio de Pokemon
    PokemonModule,

    CommonModule,

    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
