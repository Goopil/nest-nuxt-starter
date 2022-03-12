import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';

@Module({
  imports: [],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
