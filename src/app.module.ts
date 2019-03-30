import { Module,NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RenderHTMLMiddleware } from './renderHTML.middleware'
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "./config/config.module";
import {ConfigService} from "./config/config.service";
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ConfigModule, MongooseModule.forRoot('mongodb://pkumar:pkumar21@ds159812.mlab.com:59812/thrive'), AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
      ConfigService,
  ],
  exports:[]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    // consumer
    //     .apply(RenderHTMLMiddleware)
    //     .forRoutes('*')
  }
}
