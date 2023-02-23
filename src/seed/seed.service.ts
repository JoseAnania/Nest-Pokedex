// Servicio creado para alojar la lógica de negocio (Seed) de tal manera que sea reutilizable mediante inyección de dependencias.

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  // usamos AXIOS (nos permite hacer peticiones o llamadas al contenido de un enlace HTTP, en este caso de "https://pokeapi.co/")
  private readonly axios: AxiosInstance = axios;

    // inyección del modelo de Pokemon en MongoDB
    constructor(
      @InjectModel(Pokemon.name) 
      private readonly pokemonModel: Model<Pokemon>) {}

  // método para ejecutar el Seed
  async executeSeed() {

    // eliminamos la BD cada vez que ejecutamos el Seed
    await this.pokemonModel.deleteMany({});

    // realizamos la petición get a "https://pokeapi.co/"
    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100');

    // definimos una arreglo a insertar en la MongoDB
    const pokemonToInsert: {name: string, number: number}[] = [];

    // recorremos los pokemon para obtener los datos que buscamos (el "result" contiene el "name" y la "url")
    data.results.forEach(({name, url}) => {

      // el number está dentro de url, creamos una constante para separar la url 
      const segments = url.split('/');

      // obtenemos el number del pokemon, que se encuentra en la antepenúltima posición de la url
      const number: number = +segments[segments.length - 2];

      // llenamos el arreglo con los pokemon recorridos (el name y el number) 
      pokemonToInsert.push({name, number});
    });

    // insertamos en la MongoDB el arreglo
    await this.pokemonModel.insertMany(pokemonToInsert);
    
    return 'Seed Executed';
  }
}
