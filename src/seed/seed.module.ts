// Modulo generado para agrupar un conjunto de funcionalidad del Seed.

import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from '../pokemon/pokemon.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  // importamos el Módulo de Pokemon para poder usarlo en Seed
  imports: [PokemonModule],
})
export class SeedModule {}
