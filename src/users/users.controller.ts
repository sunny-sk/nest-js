import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  // POST:  /auth/signin
  @Post('/signin')
  signinInUser(@Body() body: CreateUserDto) {
    return this.authService.signIn(body.email, body.password);
  }
  // POST:  /auth/signup
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signUp(body.email, body.password);
  }

  // GET:  /auth/:id
  @Get('/:id')
  async findUser(@Param() params: { id: string }) {
    const result = await this.userService.findOne(+params.id);
    if (!result) throw new NotFoundException('User not found');
    return result;
  }

  // GET:  /auth/
  @Get('/')
  findAllUser(@Query() query: { email: string }) {
    return this.userService.findAll(query.email);
  }

  // PATCH:  /auth/:id
  @Patch('/:id')
  async updateUser(
    @Param() params: { id: string },
    @Body() body: UpdateUserDto,
  ) {
    const result = await this.userService.update(+params.id, body);
    if (!result) throw new NotFoundException('User not found');
    return result;
  }

  // DELETE:  /auth/:id
  @Delete('/:id')
  async deleteUser(@Param() params: { id: string }) {
    const result = await this.userService.delete(+params.id);
    if (!result) throw new NotFoundException('User not found');
    return result;
  }
}
