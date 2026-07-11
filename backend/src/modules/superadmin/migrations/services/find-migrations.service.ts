import { Injectable, Logger } from '@nestjs/common';
import { MigrationsRepository } from '../migrations.repository';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class FindMigrationsService {
  private readonly logger = new Logger(FindMigrationsService.name);

  constructor(
    private readonly repository: MigrationsRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}
  
  async execute(): Promise<any> {
    this.logger.log('Fetching executed migrations history');
    try {
      const migrations = await this.dataSource.query('SELECT * FROM "migrations" ORDER BY "timestamp" DESC');
      return { success: true, data: migrations };
    } catch (e) {
      this.logger.error('Failed to fetch migrations table', e);
      // Fallback to our custom entity table if TypeORM migrations table is inaccessible
      return { success: false, data: await this.repository.findAll(), error: 'Query failed' };
    }
  }

  async findOne(id: string): Promise<any> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new Error('SchemaMigration not found');
    return entity;
  }
}
