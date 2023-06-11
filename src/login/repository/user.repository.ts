
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../common/repository/base.repository';
import { UserDocument, Users } from '../schema/user.schema';

@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
  constructor(
    @InjectModel(Users.schemaName)
    private readonly userSchema: Model<UserDocument>
  ) {
    super(userSchema);
  }
}
