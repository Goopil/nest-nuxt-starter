import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';

@Module({
  imports: [ApplicationService],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
