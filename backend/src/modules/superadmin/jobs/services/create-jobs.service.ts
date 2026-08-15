import { CreateBackgroundJobDto } from '../dto/create-jobs.dto';
import { Injectable } from '@nestjs/common';
import { JobsRepository } from '../jobs.repository';
import { JobResponse } from '../jobs.interfaces';
import { JOBS_MESSAGES } from '../jobs.constants';

@Injectable()
export class CreateJobsService {
  constructor(private readonly repository: JobsRepository) {}
  
  async execute(dto: CreateBackgroundJobDto): Promise<JobResponse> {
    const data = await this.repository.create(dto);
    return {
      success: true,
      message: JOBS_MESSAGES.CREATED,
      data
    };
  }
}
