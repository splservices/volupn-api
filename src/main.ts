import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import * as helmet from 'helmet';
import * as csrf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { MyLogger } from './utils/logger.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  app.use(cookieParser());
  //app.use(csrf({cookie:true}));
  app.use(rateLimit({
    windowsMs:15 * 60 * 1000, //15 Minutes
    max:100 // limit each IP to 100 requests per windowMs
  }));
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'public'));


  await app.listen(app.get('ConfigService').get('PORT'));
}
bootstrap();
