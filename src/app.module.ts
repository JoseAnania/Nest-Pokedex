// Los Módulos agrupan un conjunto de funcionalidad específica por dominio. Este es el módulo principal o root (aquí estará la definición de todos los submódulos)

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({

  imports: [

    // importamos el servicio que nos permite utilizar las variables de entorno (".env") y las validaciones de Joi
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema
    }),

    // importamos el servicio del Contenido Estático
    ServeStaticModule.forRoot({rootPath: join(__dirname,'..','public'),}),

    // importamos el servicio de conexión a la BD (Mongo) que se encuentra en las variables de entorno (".env")
    MongooseModule.forRoot(process.env.MONGODB),

    // importamos el servicio de Pokemon
    PokemonModule,

    CommonModule,

    // importamos el servicio de Seed
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
