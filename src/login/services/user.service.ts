/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger } from '@nestjs/common';
import { Users } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private UserRepository: UserRepository) {}

  async register(userData: Users) {
    return await this.UserRepository.create(userData);
  }
}
