// Pipe creado para validar la conversión de un id en MongoId

import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {

    // si el id recibido no es del tipo MongoId
    if (!isValidObjectId(value)) {

      // devolvemos error
      throw new BadRequestException(`${value} is not a valid MongoID`);
    }
   
    return value;
  }
}
