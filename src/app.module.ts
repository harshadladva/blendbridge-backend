import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/user.module';
import { UserController } from './login/user.controller';
import { ScrapperController } from './scrapper/scrapper.controller';
import { ScrapperService } from './scrapper/scrapper.service';
const MONGO_DSN =
  'mongodb+srv://riteshdavra:5MSiiGPTDhx59fYk@blendbridgedb.w4kndm4.mongodb.net/blendbridge?retryWrites=true&w=majority';
@Module({
  imports: [MongooseModule.forRoot(MONGO_DSN), LoginModule],
  controllers: [AppController, UserController, ScrapperController],
  providers: [AppService, ScrapperService],
})
export class AppModule {}
