import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/user.module';
import { UserController } from './login/user.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://blendbridge:blendbridge123@localhost:27017/blendbridge'
    ),
    LoginModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
