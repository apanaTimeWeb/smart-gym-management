import { Injectable } from '@nestjs/common';
import { JobsRepository } from '../jobs.repository';

@Injectable()
export class UpdateJobsService {
  constructor(private readonly repository: JobsRepository) {}
  
  async execute(id: string, dto: any): Promise<any> {
    return await this.repository.update(id, dto);
  }
}
