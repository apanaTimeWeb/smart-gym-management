import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BackupRecord } from './entities/backups.entity';

@Injectable()
export class BackupsRepository {
  constructor(
    @InjectRepository(BackupRecord)
    private readonly repo: Repository<BackupRecord>,
  ) {}

  async create(data: Partial<BackupRecord>): Promise<BackupRecord> {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async findAll(): Promise<BackupRecord[]> {
    return await this.repo.find({ where: { isDeleted: false } });
  }

  async findById(id: string): Promise<BackupRecord | null> {
    return await this.repo.findOne({ where: { id, isDeleted: false } });
  }

  async update(id: string, data: Partial<BackupRecord>): Promise<BackupRecord | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.repo.update(id, { isDeleted: true });
  }
}
