import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
    PORT: number;
    DATABASE_URL: string;
}

// esp:ecifica el esquema de validación para las variables de entorno
const envVarsSchema = joi.object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required()
}).unknown(true).required()

// valida las variables de entorno según el esquema definido
const {error,value } = envVarsSchema.validate(process.env)

if(error){
    throw new Error(`Config validation error: ${error.message}`)
}

const EnvVars = value

export const envs = {
    port: EnvVars.PORT as number,
    databaseUrl: EnvVars.DATABASE_URL as string
}
