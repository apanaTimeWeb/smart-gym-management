import { Injectable, Logger } from '@nestjs/common';
import { HrRepository } from '@/modules/hr/hr.repository';
import { HR_MESSAGES } from '@/modules/hr/hr.constants';
import type { HrResponse } from '@/modules/hr/hr.interfaces';

@Injectable()
export class HrStatsService {
  private readonly logger = new Logger(HrStatsService.name);

  constructor(private readonly hrRepository: HrRepository) {}

  async getSummary(): Promise<HrResponse> {
    this.logger.log('Fetching HR summary stats');
    
    const totalStaff = await this.hrRepository.countTotalStaff();
    const activeStaff = await this.hrRepository.countActiveStaff();
    
    const payrolls = await this.hrRepository.findAllPayrollsForAggregation();
    
    let totalPayrollThisMonth = 0;
    let paidCount = 0;
    let pendingCount = 0;
    
    payrolls.forEach((p) => {
      if (p.status === 'Paid') { 
        paidCount++; 
        totalPayrollThisMonth += p.amount; 
      } else {
        pendingCount++;
      }
    });

    return {
      message: HR_MESSAGES.STATS_FETCHED_SUCCESS,
      data: { 
        totalStaff, 
        activeStaff, 
        totalPayrollThisMonth, 
        paidCount, 
        pendingCount 
      },
    };
  }
}
