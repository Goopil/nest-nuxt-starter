import { Injectable } from '@nestjs/common';
import { User } from '@common/UserInterface';

@Injectable()
export class ApplicationService {
  private readonly users: User[];

  constructor() {
    this.users = new Array(1000).fill(undefined).map((_, index) => ({
      id: index + 1,
      name: `user ${index + 1}`,
    }));
  }

  async fetchAll(): Promise<User[]> {
    return this.users;
  }

  async fetchOne(id: number): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}
