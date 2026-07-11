import { Injectable, Logger } from '@nestjs/common';
import { GymsRepository } from '../gyms.repository';

@Injectable()
export class StatsGymsService {
  private readonly logger = new Logger(StatsGymsService.name);
  constructor(private readonly repository: GymsRepository) {}

  async execute() {
    this.logger.log('Fetching gyms stats');
    const total = await this.repository.count();
    const active = await this.repository.count({ where: { status: 'ACTIVE' } });
    const suspended = await this.repository.count({ where: { status: 'SUSPENDED' } });
    const trial = await this.repository.count({ where: { status: 'TRIAL' } });
    
    return { 
      success: true, 
      stats: { total, active, suspended, trial } 
    };
  }
}
