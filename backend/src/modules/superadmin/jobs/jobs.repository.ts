import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BackgroundJob } from './entities/jobs.entity';

@Injectable()
export class JobsRepository {
  constructor(
    @InjectRepository(BackgroundJob)
    private readonly repo: Repository<BackgroundJob>,
  ) {}

  async create(data: Partial<BackgroundJob>): Promise<BackgroundJob> {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async findAll(): Promise<BackgroundJob[]> {
    return await this.repo.find({ where: { isDeleted: false } });
  }

  async findById(id: string): Promise<BackgroundJob | null> {
    return await this.repo.findOne({ where: { id, isDeleted: false } });
  }

  async update(id: string, data: Partial<BackgroundJob>): Promise<BackgroundJob | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.repo.update(id, { isDeleted: true } as any);
  }
}
