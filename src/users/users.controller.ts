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

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/login')
  login(@Body() body: any) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body.email, body.password);
  }

  @Get('/:id')
  async findUser(@Param() params: { id: string }) {
    const result = await this.userService.findOne(+params.id);
    if (!result) throw new NotFoundException('User not found');
    return result;
  }

  @Get('/')
  findAllUser(@Query() query: { email: string }) {
    return this.userService.findAll(query.email);
  }

  @Patch('/:id')
  async updateUser(
    @Param() params: { id: string },
    @Body() body: UpdateUserDto,
  ) {
    const result = await this.userService.update(+params.id, body);
    if (!result) throw new NotFoundException('User not found');
    return result;
  }

  @Delete('/:id')
  async deleteUser(@Param() params: { id: string }) {
    const result = await this.userService.delete(+params.id);
    if (!result) throw new NotFoundException('User not found');
    return result;
  }
}
