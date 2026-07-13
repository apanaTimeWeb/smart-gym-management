import { Injectable, Logger } from '@nestjs/common';
import { GymsRepository } from '../gyms.repository';
import { TenantStatus } from '../gyms.interfaces';

@Injectable()
export class StatsGymsService {
  private readonly logger = new Logger(StatsGymsService.name);
  constructor(private readonly repository: GymsRepository) {}

  async execute() {
    this.logger.log('Fetching gyms stats');
    const total = await this.repository.count();
    const active = await this.repository.count({ where: { status: TenantStatus.ACTIVE } });
    const suspended = await this.repository.count({ where: { status: TenantStatus.SUSPENDED } });
    const trial = await this.repository.count({ where: { status: TenantStatus.TRIAL } });
    
    return { 
      success: true, 
      stats: { total, active, suspended, trial } 
    };
  }
}
