import {
  IsString,
  IsEmail,
  IsAlphanumeric,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsAlphanumeric()
  @MinLength(5)
  @MaxLength(8)
  password: string;
}
