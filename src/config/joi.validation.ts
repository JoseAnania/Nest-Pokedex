// Archivo creado para usar valores por defecto y validar a través del paquete Joi, las variables de entorno definidas en ".env"

import * as Joi from "joi";

export const JoiValidationSchema = Joi.object({
    
    // la conexión a MongoDB será obligatoria 
    MONGODB: Joi.required(),

    // el puerto será number y en caso de no estar definida en las variables de entorno (".env") será el 3002
    PORT: Joi.number().default(3002),
});