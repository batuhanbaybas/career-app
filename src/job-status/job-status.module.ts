import { Module } from '@nestjs/common';
import { JobStatusController } from './job-status.controller';
import { JobStatusService } from './job-status.service';

@Module({
  controllers: [JobStatusController],
  providers: [JobStatusService],
})
export class JobStatusModule {}
