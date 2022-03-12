import { Controller, Get } from '@nestjs/common';
import { User } from '@common/UserInterface';
import { ApplicationService } from '@server/application.service';

@Controller()
export class ApplicationController {
  constructor(private readonly appService: ApplicationService) {}

  @Get('/ping')
  ping(): string {
    return 'pong';
  }

  @Get('/users')
  async fetchAll(): Promise<User[]> {
    return this.appService.fetchAll();
  }
}
