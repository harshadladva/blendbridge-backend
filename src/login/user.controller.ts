import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { API_END_POINTS } from '../common/types/api-end-points';
import { CreateUserDto } from './entity/create-user';
import { UserService } from './services/user.service';
import { LoginUser } from './entity/user.entity';
import { HttpExceptionFilter } from '../common/helper/http.exception';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post(API_END_POINTS.register)
  @UseFilters(new HttpExceptionFilter())
  private async registerUser(@Body() userData: CreateUserDto) {
    try {
      return await this.userService.register(userData);
    } catch (error) {
      throw new BadRequestException({
        statusCode: error.status || HttpStatus.BAD_REQUEST,
        message: error.message || 'There is some error while register user',
      });
    }
  }

  @Post(API_END_POINTS.login)
  @UseFilters(new HttpExceptionFilter())
  private async loginUser(@Body() loginData: LoginUser): Promise<boolean> {
    return await this.userService.login(loginData);
  }
}
