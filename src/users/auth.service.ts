import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(email: string, password: string) {
    const results = await this.userService.findAll(email);
    if (results.length > 0) {
      // user already exits
      return null;
    }
    // hash password
    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    // create user & save it
    const user = await this.userService.create(email, hashPassword);

    /// return user
    return user;
  }
  async signIn(email: string, password: string) {
    const results = await this.userService.findAll(email);
    if (results.length === 0) {
      // user does not exits
      return null;
    }
    const isMatch = await bcrypt.compare(password, results[0].password);
    if (!isMatch) {
      // incorrect password
      throw new BadRequestException('Incorrect email or password');
    }
    return results[0];
  }
}
