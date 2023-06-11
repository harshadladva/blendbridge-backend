import { UserController } from './user.controller';
import { UserService } from './services/user.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './repository/user.repository';
import { UserSchema, Users } from './schema/user.schema';
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
  controllers: [UserController],
  providers: [UserService, HashService, UserRepository],
  exports: [UserService, HashService, UserRepository],
})
export class LoginModule {}
