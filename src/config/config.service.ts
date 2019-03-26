import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'Joi';

export interface EnvConfig {
    [key: string]: string;
}

export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string){
        const config = dotenv.parse(fs.readFileSync(__dirname+'/../../.env', 'utf-8'))
        this.envConfig = this.validateInput(config);
    }

    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid(['development','production','test', 'provision'])
                .default('development'),
            PORT:Joi.number().default(3000),
            MONGO_URL:Joi.string().required(),
            JWT_SECRET:Joi.string().required(),
            FACEBOOK_APP_ID:Joi.string().required(),
            FACEBOOK_APP_SECRET:Joi.string().required(),
            CALLBACK_URL:Joi.string().required(),
            GOOGLE_CLIENT_ID:Joi.string().required(),
            GOOGLE_SECRET:Joi.string().required(),
            GOOGLE_CALLBACK:Joi.string().required()
        });

        const {error, value:validateEnvConfig} = Joi.validate(envConfig, envVarSchema);
        if(error){
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validateEnvConfig;
    }

    get(key: string): string{
        return this.envConfig[key];
    }
}