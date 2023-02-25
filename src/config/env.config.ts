// Archivo de Configuración creado para usar valores por defecto (en caso que no se tengan las variables de entorno, es decir el ".env")
// Es mejor usar JOI

export const EnvConfiguration = () => ({

    // definimos las variables de entorno natural
    enviroment: process.env.NODE_ENV,

    // definimos la conexión a la BD (en caso que no exista las variables de entorno (".env"), dará error porque será undefine)
    mongoDB: process.env.MONGODB,

    // definimos el puerto (si no está definido en las variables de entorno (".env") se usará el "3002")
    port: process.env.PORT || 3002
});