import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessageRepository } from './messages.repository';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessageRepository],  // things that can be used as a dependency for other classes
})
export class MessagesModule {}
