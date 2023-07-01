import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/user.module';
import { UserController } from './login/user.controller';
import { ScrapperController } from './scrapper/scrapper.controller';
import { ScrapperService } from './scrapper/scrapper.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://blendbridge:blendbridge123@localhost:27017/blendbridge'
    ),
    LoginModule,
  ],
  controllers: [AppController, UserController, ScrapperController],
  providers: [AppService, ScrapperService],
})
export class AppModule {}
