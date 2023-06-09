import { LoginController } from './login.controller';
import { LoginService } from './services/login.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, Users } from './schema/login.schema';
import { HashService } from './services/hash.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Users.schemaName,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [LoginController],
  providers: [LoginService, HashService],
})
export class LoginModule {}
