import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from './application.controller';
import { ApplicationService } from "@server/application.service";

describe('ApplicationController', () => {
  let controller: ApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationService],
      controllers: [ApplicationController],
    }).compile();

    controller = module.get<ApplicationController>(ApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
