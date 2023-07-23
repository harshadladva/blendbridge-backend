import { UserService } from './services/user.service';
import { UserController } from './user.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './repository/user.repository';
import { UserSchema, Users } from './schema/user.schema';

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
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class LoginModule {}
