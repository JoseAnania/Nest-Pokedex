// DTO creado para definir la modificación (PATCH) de un Pokemon (Data Transfer Object son un tipo de objetos que sirven únicamente para transportar datos)

import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';

export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
