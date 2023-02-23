// Controlador generado para controlar las rutas de Seed, son los encargados de escuchar la solicitud y emitir una respuesta.

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  // método para ejecutar el Seed
  @Get()
  runSeed() {
    return this.seedService.executeSeed();
  }
}
