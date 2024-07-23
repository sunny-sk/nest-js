import { Injectable } from '@nestjs/common';
import fs, { readFile, writeFile } from 'fs/promises';
import * as path from 'path';

// deals with the any storage system, can be independent as long as implement all the methods require by services
// in this way it becomes plugin & play
// it only rcevies baked data no need to do modification here JUST save to storage


@Injectable() // marking this class as injectable in Dependency injection container
export class MessageRepository {
  async findOne(id: string) {
    try {
      let content = await readFile(
        path.join(process.cwd(), 'message.json'),
        'utf-8',
      );
      let messages = JSON.parse(content);
      return messages[id];
    } catch (error) {}
  }
  async findAll() {
    try {
      let content = await readFile(
        path.join(process.cwd(), 'message.json'),
        'utf-8',
      );
      let messages = JSON.parse(content);
      // return Object.keys(messages).map((id) => ({ id, content: messages[id] }));
      return messages;
    } catch (error) {}
  }

  async createMessae(content: string) {
    let contents = await readFile(
      path.join(process.cwd(), 'message.json'),
      'utf-8',
    );
    let messages = JSON.parse(contents);
    const id = new Date().toISOString();
    messages[id] = {
      id: id,
      content,
    };
    await writeFile('message.json', JSON.stringify(messages), 'utf-8');
    return {
      data: {
        id: id,
        content,
      },
      message: 'Message created successfully!',
    };
  }
}
