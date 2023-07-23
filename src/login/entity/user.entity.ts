import { Transform } from 'class-transformer';
import {
  IsBase64,
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Max,
  Min,
} from 'class-validator';
import { encryptPassword } from '../services/password.helper';
import { UserRepository } from '../repository/user.repository';

export enum YesNoMaybe {
  YES = 'yes',
  NO = 'no',
  MAYBE = 'maybe',
}

export class Users {
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @IsNotEmpty()
  @IsDefined()
  password: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsDefined()
  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsDefined()
  @IsBase64()
  profileImage: string;

  @IsNotEmpty()
  @IsDefined()
  @IsMobilePhone()
  mobileNumber: string;

  @IsBase64()
  @IsNotEmpty()
  @IsDefined()
  resume: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  currentCompany: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  currentJobProfile: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  dreamCompany: string;

  @IsNotEmpty()
  @IsDefined()
  @IsEnum(YesNoMaybe)
  feelCourseForAchivingDreamJobIsCorrect: YesNoMaybe;

  @IsOptional()
  @IsString()
  whatYoubelieveNotInyourFavour: string;

  @IsNotEmpty()
  @IsDefined()
  @Min(1)
  @Max(5)
  appRating: number;

  constructor(private userRepository: UserRepository) {}

  async isEmailAlreadyRegistered(params: unknown): Promise<boolean> {
    const isAlreadyRegistered = await this.userRepository.find(params);
    return !!isAlreadyRegistered;
  }
}

export class LoginUser {
  @IsNotEmpty()
  @IsEmail()
  @IsDefined()
  email: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  password: string;
}
