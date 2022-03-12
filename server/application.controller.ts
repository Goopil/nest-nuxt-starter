import { Controller, Get } from '@nestjs/common';
import { User } from '@common/UserInterface';

@Controller()
export class ApplicationController {
  @Get('/ping')
  ping(): string {
    return 'pong';
  }

  @Get('/users')
  async fetchAll(): Promise<User[]> {
    return new Array(1000).fill(undefined).map((_, index) => ({
      name: `user ${index}`,
    }));
  }
}
