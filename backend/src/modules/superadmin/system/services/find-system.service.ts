import { Injectable, Logger } from '@nestjs/common';
import { SystemRepository } from '../system.repository';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { SystemResponse } from '../system.interfaces';
import { SYSTEM_MESSAGES, SYSTEM_ERRORS } from '../system.constants';

@Injectable()
export class FindSystemService {
  private readonly logger = new Logger(FindSystemService.name);

  constructor(
    private readonly repository: SystemRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}
  
  async getHealth(): Promise<SystemResponse> {
    this.logger.log('Performing system health check');
    let dbStatus = 'healthy';
    
    try {
      await this.dataSource.query('SELECT 1');
    } catch (e) {
      this.logger.error('Database ping failed', e);
      dbStatus = 'unhealthy';
    }

    const memoryUsage = process.memoryUsage();
    
    return {
      success: true,
      message: 'System health checked successfully',
      data: {
        status: dbStatus === 'healthy' ? 'UP' : 'DOWN',
        database: dbStatus,
        memory: {
          rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
          heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
          heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
        },
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
      }
    };
  }

  async execute(): Promise<SystemResponse> {
    const data = await this.repository.findAll();
    return {
      success: true,
      message: SYSTEM_MESSAGES.FETCHED,
      data
    };
  }
  
  async findOne(id: string): Promise<SystemResponse> {
    const data = await this.repository.findById(id);
    if (!data) throw new Error(SYSTEM_ERRORS.NOT_FOUND);
    return {
      success: true,
      message: SYSTEM_MESSAGES.FETCHED,
      data
    };
  }
}
