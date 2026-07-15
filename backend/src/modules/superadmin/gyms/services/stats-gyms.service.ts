import { Injectable, Logger } from '@nestjs/common';
import { GymsRepository } from '../gyms.repository';
import { TenantStatus, TenantResponse } from '../gyms.interfaces';
import { GYMS_MESSAGES } from '../gyms.constants';

@Injectable()
export class StatsGymsService {
  private readonly logger = new Logger(StatsGymsService.name);
  constructor(private readonly repository: GymsRepository) {}

  async execute(): Promise<TenantResponse> {
    this.logger.log('Fetching gyms stats');
    const total = await this.repository.count();
    const active = await this.repository.count({ where: { status: TenantStatus.ACTIVE } });
    const suspended = await this.repository.count({ where: { status: TenantStatus.SUSPENDED } });
    const trial = await this.repository.count({ where: { status: TenantStatus.TRIAL } });
    
    return { 
      success: true, 
      message: GYMS_MESSAGES.FETCHED,
      data: { total, active, suspended, trial } 
    };
  }
}
