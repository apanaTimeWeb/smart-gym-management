import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReleaseNote } from './entities/system.entity';

@Injectable()
export class SystemRepository {
  constructor(
    @InjectRepository(ReleaseNote)
    private readonly repo: Repository<ReleaseNote>,
  ) {}

  async create(data: Partial<ReleaseNote>): Promise<ReleaseNote> {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async findAll(): Promise<ReleaseNote[]> {
    return await this.repo.find({ where: { isDeleted: false } });
  }

  async findById(id: string): Promise<ReleaseNote | null> {
    return await this.repo.findOne({ where: { id, isDeleted: false } });
  }

  async update(id: string, data: Partial<ReleaseNote>): Promise<ReleaseNote | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.repo.update(id, { isDeleted: true });
  }
}
