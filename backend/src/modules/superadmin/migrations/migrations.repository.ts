import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchemaMigration } from './entities/migrations.entity';

@Injectable()
export class MigrationsRepository {
  constructor(
    @InjectRepository(SchemaMigration)
    private readonly repo: Repository<SchemaMigration>,
  ) {}

  async create(data: Partial<SchemaMigration>): Promise<SchemaMigration> {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async findAll(): Promise<SchemaMigration[]> {
    return await this.repo.find({ where: { isDeleted: false } });
  }

  async findById(id: string): Promise<SchemaMigration | null> {
    return await this.repo.findOne({ where: { id, isDeleted: false } });
  }

  async update(id: string, data: Partial<SchemaMigration>): Promise<SchemaMigration | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.repo.update(id, { isDeleted: true } as any);
  }
}
