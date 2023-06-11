import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { MongoConfigService } from './providers/mongo.service';
import { ScrapperController } from './scrapper/scrapper.controller';
import { ScrapperService } from './scrapper/scrapper.service';

@Module({
  imports: [
    LoginModule,
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
  ],
  controllers: [AppController, ScrapperController],
  providers: [AppService, ScrapperService],
})
export class AppModule {}
