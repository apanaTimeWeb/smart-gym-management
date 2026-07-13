import { UpdateBackgroundJobDto } from '../dto/update-jobs.dto';
import { Injectable } from '@nestjs/common';
import { JobsRepository } from '../jobs.repository';
import { JobResponse } from '../jobs.interfaces';
import { JOBS_MESSAGES } from '../jobs.constants';

@Injectable()
export class UpdateJobsService {
  constructor(private readonly repository: JobsRepository) {}
  
  async execute(id: string, dto: UpdateBackgroundJobDto): Promise<JobResponse> {
    const data = await this.repository.update(id, dto);
    return {
      success: true,
      message: JOBS_MESSAGES.UPDATED,
      data
    };
  }
}
