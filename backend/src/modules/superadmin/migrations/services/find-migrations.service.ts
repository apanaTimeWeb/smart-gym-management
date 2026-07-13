import { Injectable, Logger } from '@nestjs/common';
import { MigrationsRepository } from '../migrations.repository';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { MigrationResponse } from '../migrations.interfaces';
import { MIGRATIONS_MESSAGES, MIGRATIONS_ERRORS } from '../migrations.constants';

@Injectable()
export class FindMigrationsService {
  private readonly logger = new Logger(FindMigrationsService.name);

  constructor(
    private readonly repository: MigrationsRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}
  
  async execute(): Promise<MigrationResponse> {
    this.logger.log('Fetching executed migrations history');
    try {
      const data = await this.dataSource.query('SELECT * FROM "migrations" ORDER BY "timestamp" DESC');
      return { 
        success: true, 
        message: MIGRATIONS_MESSAGES.FETCHED,
        data 
      };
    } catch (e) {
      this.logger.error('Failed to fetch migrations table', e);
      // Fallback to our custom entity table if TypeORM migrations table is inaccessible
      const data = await this.repository.findAll();
      return { success: false, message: 'Query failed', data };
    }
  }

  async findOne(id: string): Promise<MigrationResponse> {
    const data = await this.repository.findById(id);
    if (!data) throw new Error(MIGRATIONS_ERRORS.NOT_FOUND);
    return {
      success: true,
      message: MIGRATIONS_MESSAGES.FETCHED,
      data
    };
  }
}
