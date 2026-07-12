import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackgroundJob } from './entities/jobs.entity';
import { CreateJobsController } from './controllers/create-jobs.controller';
import { FindJobsController } from './controllers/find-jobs.controller';
import { UpdateJobsController } from './controllers/update-jobs.controller';
import { DeleteJobsController } from './controllers/delete-jobs.controller';
import { CreateJobsService } from './services/create-jobs.service';
import { FindJobsService } from './services/find-jobs.service';
import { UpdateJobsService } from './services/update-jobs.service';
import { DeleteJobsService } from './services/delete-jobs.service';
import { JobsRepository } from './jobs.repository';

import { BullModule } from '@nestjs/bullmq';
import { DataRetentionProcessor } from './processors/data-retention.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([BackgroundJob]),
    BullModule.registerQueue(
      { name: 'broadcasts' },
      { name: 'backups' },
      { name: 'data-retention' }
    )
  ],
  controllers: [CreateJobsController, FindJobsController, UpdateJobsController, DeleteJobsController],
  providers: [
    CreateJobsService, 
    FindJobsService, 
    UpdateJobsService, 
    DeleteJobsService, 
    JobsRepository,
    ...(process.platform !== 'win32' ? [DataRetentionProcessor] : [])
  ],
  exports: [CreateJobsService, FindJobsService, UpdateJobsService, DeleteJobsService],
})
export class JobsModule {}
