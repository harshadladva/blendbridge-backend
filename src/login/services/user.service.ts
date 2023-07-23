/*
https://docs.nestjs.com/providers#services
*/

import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUser, Users } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { decryptPassword, encryptPassword } from './password.helper';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private userRepository: UserRepository) {}

  async register(userData: Users) {
    const decryptPassword = await encryptPassword(userData.password);
    const isAlreadyRegistered = await this.userRepository.find({
      $or: [{ email: userData.email }, { phone: userData.mobileNumber }],
    });
    if (isAlreadyRegistered) {
      throw new ConflictException({
        message:
          'You are already registered with same email or mobile. Please use unique mobile number or email.',
      });
    }
    return await this.userRepository.create({
      ...userData,
      password: decryptPassword,
    });
  }

  async login(loginData: LoginUser): Promise<boolean> {
    const isUserLoggedIn = await this.isUserLogin(loginData);
    if (!isUserLoggedIn) {
      throw new UnauthorizedException({
        message: 'Invalid password',
      });
    }
    return true;
  }

  async isUserLogin(loginData: LoginUser): Promise<boolean> {
    const user = await this.userRepository.findOne(
      { email: loginData.email },
      { password: 1 }
    );
    return await decryptPassword(loginData.password, user.password);
  }
}
