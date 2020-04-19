import { Get, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/ping')
  ping(): string {
    return 'pong';
  }
}
