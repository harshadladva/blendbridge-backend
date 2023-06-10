import { LoginController } from './login.controller';
import { LoginService } from './services/login.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginRepository } from './repository/login.repository';
import { UserSchema, Users } from './schema/login.schema';
import { HashService } from './services/hash.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.schemaName,
        schema: UserSchema,
        collection: Users.schemaName,
      },
    ]),
  ],
  controllers: [LoginController],
  providers: [LoginService, HashService, LoginRepository],
})
export class LoginModule {}
