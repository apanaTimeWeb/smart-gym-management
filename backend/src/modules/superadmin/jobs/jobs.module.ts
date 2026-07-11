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

@Module({
  imports: [TypeOrmModule.forFeature([BackgroundJob])],
  controllers: [CreateJobsController, FindJobsController, UpdateJobsController, DeleteJobsController],
  providers: [CreateJobsService, FindJobsService, UpdateJobsService, DeleteJobsService, JobsRepository],
  exports: [CreateJobsService, FindJobsService, UpdateJobsService, DeleteJobsService],
})
export class JobsModule {}
