
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/common/repository/base.repository';
import { UserDocument, Users } from '../schema/login.schema';

@Injectable()
export class LoginRepository extends EntityRepository<UserDocument> {
  constructor(
    @InjectModel(Users.schemaName)
    private readonly userSchema: Model<UserDocument>
  ) {
    super(userSchema);
  }
}
