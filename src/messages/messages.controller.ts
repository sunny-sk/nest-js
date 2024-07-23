import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('/messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}
  @Get()
  getAll() {
    return this.messagesService.findAll();
  }

  @Get('/:id')
  async getById(@Param() params: { id: string }) {
    const data = await this.messagesService.findOne(params.id);
    if (!data) {
      throw new NotFoundException({
        message: 'No data found',
        statusCode: 404,
        error: {},
        success: false,
      });
    }
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }
}
