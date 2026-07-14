import { Injectable, Logger } from '@nestjs/common';
import { GymsRepository } from '../gyms.repository';
import { TenantResponse } from '../gyms.interfaces';
import { GYMS_MESSAGES } from '../gyms.constants';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DeleteGymsService {
  private readonly logger = new Logger(DeleteGymsService.name);

  constructor(
    private readonly repository: GymsRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}
  
  async execute(id: string, hardDelete: boolean = false): Promise<TenantResponse> {
    if (hardDelete) {
      this.logger.log(`Hard deleting tenant and database for: ${id}`);
      const dbName = `tenant_db_${id}`;
      try {
        await this.dataSource.query(`
          SELECT pg_terminate_backend(pg_stat_activity.pid) 
          FROM pg_stat_activity 
          WHERE pg_stat_activity.datname = '${dbName}' 
          AND pid <> pg_backend_pid();
        `);
        await this.dataSource.query(`DROP DATABASE IF EXISTS "${dbName}"`);
        this.logger.log(`Dropped database ${dbName}`);
      } catch (err: any) {
        this.logger.error(`Failed to drop database ${dbName}`, err);
      }
      
      await this.repository.delete(id);
    } else {
      await this.repository.softDelete(id);
    }
    
    return {
      success: true,
      message: GYMS_MESSAGES.DELETED,
      data: null
    };
  }
}
