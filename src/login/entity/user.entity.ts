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
  @IsString()
  @IsStrongPassword()
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

  constructor(body: LoginUser) {}
}
