// Servicio creado para alojar la lógica de negocio (Pokemon) de tal manera que sea reutilizable mediante inyección de dependencias.

import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  // inyección del modelo de Pokemon en MongoDB
  constructor(
    @InjectModel(Pokemon.name) 
    private readonly pokemonModel: Model<Pokemon>) {}
 
  // método para agregar un Pokemon
  async create(createPokemonDto: CreatePokemonDto) {
    
    // para que el nombre siempre sea en minúscula
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
     
      // insertamos el nuevo pokemon en DB
    const pokemon = await this.pokemonModel.create(createPokemonDto); 

    // retornamos el Pokemon creado
    return pokemon;
      
    // manejo de errores
    } catch (error) {
      
      // si el registro ya existe
      this.handleException(error);
    }
  }

  // método para obtener todos los Pokemon (con paginación)
  async findAll(paginationDto: PaginationDto) {

    // creamos una constante desestructurada que por defecto (si no vienen los parámetros "limit" y "offset" será de 10 y 0 respect.)
    const {limit = 10, offset = 0} = paginationDto;

    // retornamos todos los pokemon según la paginación (por defecto o no)
    return this.pokemonModel.find()

      // cantidad de resultados
      .limit(limit)
      // página
      .skip(offset)
      // orden
      .sort({number:1})
      // no mostrar
      .select('-__v');
  }

  // método para obtener un Pokemon por Id (que puede ser por "number", "name", "mongoId")
  async findOne(id: string) {

    // creamos una variable del tipo de la Entidad
    let pokemon: Pokemon;

    // validación por el campo "number"
    if (!isNaN(+id)) {
      
      // buscamos el Pokemon por el "number" en BD
      pokemon = await this.pokemonModel.findOne({number: id});
    }

    // validación por el "mongoId" de la BD
    if (!pokemon && isValidObjectId(id)) {
      
      // buscamos el Pokemon por el "mongoId" en BD
      pokemon = await this.pokemonModel.findById(id);
    }
    
    // validación por el campo "name"
    if (!pokemon) {
      
      // buscamos el Pokemon por el "name" en BD
      pokemon = await this.pokemonModel.findOne({name: id.toLowerCase().trim()});
    }

    // si no existe el Pokemon
    if (!pokemon)
      throw new NotFoundException(`Pokemon whit id, name or number "${id}" not found`);
    
    // si existe, retornamos el Pokemon
    return pokemon;
  }

  // método para actualizar un Pokemon por Id
  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    
    // buscamos el Pokemon por el id que nos viene por parametro (que puede ser por "number", "name", "mongoId")
    const pokemon = this.findOne(id);

    // si se modifica el nombre, lo ponemos en minúscula
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
     
      // insertamos en BD la modificación
    await (await pokemon).updateOne(updatePokemonDto);
    
    // retornamos el Pokemon actualizado
    return {...(await pokemon).toJSON(), ...updatePokemonDto};

    // manejo de errores
    } catch (error) {

      // si el "number" a modificar ya existe
      this.handleException(error);
    }
  }

  // método para eliminar un Pokemon por Id (sólo por el id de MongoDB)
  async remove(id: string) {
    
    // buscamos y eliminamos el Pokemon a por su MongoID 
    const pokemon = await this.pokemonModel.deleteOne({_id: id});

    // si no se encuentra
    if (pokemon.deletedCount === 0)
      throw new BadRequestException(`Pokemon with id "${id}" not found`);

    return;
  }

  // método para manejar los errores "11000"
  private handleException(error: any) {

    // si el error es 11000
    if (error.code === 11000) {
      
      throw new BadRequestException(`Pokemon exists in DB ${JSON.stringify(error.keyValue)}`);
    }

    // si es otro error (diferente al anterior)
    throw new InternalServerErrorException(`Can't create Pokemon - check server logs`);
  }
}
