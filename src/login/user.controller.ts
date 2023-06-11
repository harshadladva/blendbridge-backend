import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { API_END_POINTS } from '../common/types/api-end-points';
import { CreateUserDto } from './entity/create-user';
import { UserService } from './services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post(API_END_POINTS.register)
  private async registerUser(@Body() userData: CreateUserDto) {
    try {
      return await this.userService.register(userData);
    } catch (error) {
      throw new BadRequestException({
        message: 'User is not register',
      });
    }
  }
}
