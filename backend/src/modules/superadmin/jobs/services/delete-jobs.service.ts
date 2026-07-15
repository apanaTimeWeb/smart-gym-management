import { Injectable } from '@nestjs/common';
import { JobsRepository } from '../jobs.repository';
import { JobResponse } from '../jobs.interfaces';
import { JOBS_MESSAGES } from '../jobs.constants';

@Injectable()
export class DeleteJobsService {
  constructor(private readonly repository: JobsRepository) {}
  
  async execute(id: string): Promise<JobResponse> {
    await this.repository.softDelete(id);
    return {
      success: true,
      message: JOBS_MESSAGES.DELETED,
      data: null
    };
  }
}
