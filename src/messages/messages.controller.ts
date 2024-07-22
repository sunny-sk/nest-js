import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('/messages')
export class MessagesController {
  @Get()
  getAll() {}

  @Get('/:id')
  getById(@Param() params: { id: string }) {
    return params;
  }

  @Post()
  createMessage(@Body() body: any) {
    return body;
  }
}
