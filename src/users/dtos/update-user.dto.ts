import {
  IsString,
  IsEmail,
  IsAlphanumeric,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsAlphanumeric()
  @MinLength(5)
  @MaxLength(8)
  @IsOptional()
  password: string;
}
