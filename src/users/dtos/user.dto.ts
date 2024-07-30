import { Expose } from 'class-transformer';
import {} from 'class-validator';

export class UserDto {
  @Expose()
  id: number;
  
  @Expose()
  email: string;

  @Expose()
  success: boolean;

  @Expose()
  message: string;

  @Expose()
  statusCode: number;
}
