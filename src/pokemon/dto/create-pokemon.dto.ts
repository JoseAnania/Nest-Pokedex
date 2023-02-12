// DTO creado para definir la creación (POST) de un Pokemon (Data Transfer Object son un tipo de objetos que sirven únicamente para transportar datos)

import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    number: number;

    @IsString()
    @MinLength(1)
    name: string;
}
