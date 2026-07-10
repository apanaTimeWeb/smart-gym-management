import { Injectable } from '@nestjs/common';
import { SalesRepository } from '@/modules/sales/sales.repository';
import { SALES_MESSAGES } from '@/modules/sales/sales.constants';

@Injectable()
export class SalesOverviewService {
  constructor(private readonly salesRepository: SalesRepository) {}

  async execute() {
    const monthlyRevenue = await this.salesRepository.getMonthlyOverview();
    return {
      success: true,
      message: SALES_MESSAGES.OVERVIEW_FETCHED_SUCCESS,
      data: { monthlyRevenue },
    };
  }
}
