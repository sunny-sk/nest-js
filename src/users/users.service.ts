import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    /*
      if the user entity instance does not created then, the hooks will not called while performing operations on repository/db like, so try to create/get entity instance first.
    */
    const user = this.repo.create({ email, password });
    this.repo.save(user);
    return user;
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({ id }); // return one record or null
  }
  async findAll(email: string) {
    return await this.repo.find({ where: { email } }); // return data or empty array
  }

  async update(id: number, attr: Partial<CreateUserDto>) {
    const user = await this.repo.findOneBy({ id });
    if (!user) return null;
    Object.assign(user, attr);
    return this.repo.save(user);
  }

  async delete(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) return null;
    return this.repo.remove(user);
  }
}
