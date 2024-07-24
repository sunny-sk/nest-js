import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterUpdate,
  IsNull,
  AfterInsert,
  AfterRemove,
  Unique,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`user is inserted with ${this.id}`);
  }
  @AfterRemove()
  logRemove() {
    console.log(`user is removed with ${this.id}`);
  }
  @AfterUpdate()
  logUpdate() {
    console.log(`user is updated with ${this.id}`);
  }
}
