import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('/messages')
export class MessagesController {
  @Get()
  getAll() {
    return [{}];
  }

  @Get('/:id')
  getById() {
    return [{}];
  }

  @Post()
  createMessage() {}
}
