import { Injectable } from '@nestjs/common';
import { MessageRepository } from './messages.repository';

// all business logic comes here like modification, calculation etc...

@Injectable() // marking this class as injectable in Dependency injection container
  
export class MessagesService {
  constructor(public messagesRepo: MessageRepository) {}

  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }
  findAll() {
    return this.messagesRepo.findAll();
  }

  create(content: string) {
    return this.messagesRepo.createMessae(content);
  }
}
