import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { MongoConfigService } from './providers/mongo.service';

@Module({
  imports: [
    LoginModule,
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
