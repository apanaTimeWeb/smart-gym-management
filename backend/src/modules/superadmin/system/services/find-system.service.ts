import { Injectable, Logger } from '@nestjs/common';
import { SystemRepository } from '../system.repository';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class FindSystemService {
  private readonly logger = new Logger(FindSystemService.name);

  constructor(
    private readonly repository: SystemRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}
  
  async getHealth(): Promise<any> {
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

  async execute(): Promise<any[]> {
    return await this.repository.findAll();
  }
  
  async findOne(id: string): Promise<any> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new Error('ReleaseNote not found');
    return entity;
  }
}
