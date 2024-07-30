import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  Session,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  // POST:  /auth/signout
  @Get('/signout')
  @HttpCode(200)
  signOutUser(@Session() session: any) {
    session.userId = null;
    return {
      success: true,
      statusCode: 200,
      message: 'Logout successfully!',
    };
  }
  // POST:  /auth/signin
  @Post('/signin')
  @HttpCode(200)
  async signinInUser(@Body() body: CreateUserDto, @Session() session: any) {
    const result = await this.authService.signIn(body.email, body.password);
    if (!result) {
      throw new BadRequestException('Incorrect email or password');
    }
    session.userId = result.id;
    return result;
  }

  // POST:  /auth/me
  @Get('/me')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getMe(@CurrentUser() user: User) {
    return user;
  }

  // POST:  /auth/signup
  @Post('/signup')
  async signUpUser(@Body() body: CreateUserDto, @Session() session: any) {
    const result = await this.authService.signUp(body.email, body.password);
    if (!result) {
      throw new BadRequestException('Email already in use');
    }
    session.userId = result.id;
    return result;
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
