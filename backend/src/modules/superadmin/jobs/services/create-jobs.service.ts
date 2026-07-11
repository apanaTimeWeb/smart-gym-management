import { Injectable } from '@nestjs/common';
import { JobsRepository } from '../jobs.repository';

@Injectable()
export class CreateJobsService {
  constructor(private readonly repository: JobsRepository) {}
  
  async execute(dto: CreateJobsDto): Promise<any> {
    return await this.repository.create(dto);
  }
}
