import { Injectable } from '@nestjs/common';
import { JobsRepository } from '../jobs.repository';

@Injectable()
export class DeleteJobsService {
  constructor(private readonly repository: JobsRepository) {}
  
  async execute() {
    // Implement delete logic
  }
}
