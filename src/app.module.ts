import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    LoginModule,
    MongooseModule.forRoot(
      'mongodb://blendbridge:blendbridge123@localhost:27017/blendbridge'
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
