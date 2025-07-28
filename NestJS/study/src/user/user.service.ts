import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = ['Alice', 'Bob', 'Charlie'];

  findAll(): string[] {
    return this.users;
  }
}
