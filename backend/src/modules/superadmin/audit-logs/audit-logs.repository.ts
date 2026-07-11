import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlobalAuditLog } from './entities/audit-logs.entity';

@Injectable()
export class AuditLogsRepository {
  constructor(
    @InjectRepository(GlobalAuditLog)
    private readonly repo: Repository<GlobalAuditLog>,
  ) {}

  async create(data: Partial<GlobalAuditLog>): Promise<GlobalAuditLog> {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async findAll(): Promise<GlobalAuditLog[]> {
    return await this.repo.find({ where: { isDeleted: false } });
  }

  async findById(id: string): Promise<GlobalAuditLog | null> {
    return await this.repo.findOne({ where: { id, isDeleted: false } });
  }

  async update(id: string, data: Partial<GlobalAuditLog>): Promise<GlobalAuditLog | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.repo.update(id, { isDeleted: true } as any);
  }
}
