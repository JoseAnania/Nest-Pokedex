// Entidad creada para definir el objeto Pokemon (una entidad se asociará directamente con una tabla de una base de datos)

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

// clase que hereda de Mongo ("Document" de Mongo) y es un esquema de BD
@Schema()
export class Pokemon extends Document {
    
    @Prop({
        unique: true,
        index: true
    })
    name: string;

    @Prop({
        unique: true,
        index: true
    })
    number: number;
}

// exportamos el Esquema
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);