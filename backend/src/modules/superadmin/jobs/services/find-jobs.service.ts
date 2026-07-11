import { Injectable } from '@nestjs/common';
import { JobsRepository } from '../jobs.repository';

@Injectable()
export class FindJobsService {
  constructor(private readonly repository: JobsRepository) {}
  
  async execute() {
    // Implement find logic
  }
}
