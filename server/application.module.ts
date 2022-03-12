import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';

@Module({
  imports: [],
  controllers: [ApplicationController],
  providers: [],
})
export class ApplicationModule {}
