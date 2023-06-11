/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger } from '@nestjs/common';
import { LoginUser, Users } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private userRepository: UserRepository) {}

  async register(userData: Users) {
    return await this.userRepository.create(userData);
  }

  async login(loginData: LoginUser): Promise<boolean> {
    return await this.isUserLogin(loginData.email);
  }

  async isUserLogin(email: string): Promise<any> {
    const user = await this.userRepository.find({ email: email });
    console.log('usere', user);
  }
}
