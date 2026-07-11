import { Injectable } from '@nestjs/common';
import { JobsRepository } from '../jobs.repository';

@Injectable()
export class FindJobsService {
  constructor(private readonly repository: JobsRepository) {}
  
  async execute(): Promise<any[]> {
    return await this.repository.findAll();
  }
  async findOne(id: string): Promise<any> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new Error('BackgroundJob not found');
    return entity;
  }
}
