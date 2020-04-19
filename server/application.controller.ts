import { Get, Controller } from '@nestjs/common';
import { User } from '@common/UserInterface';

@Controller()
export class AppController {
  @Get('/ping')
  ping(): string {
    return 'pong';
  }

  @Get('/users')
  async fetchAll(): Promise<User[]> {
    return [
      {name: 'John'}
    ]
  }
}
