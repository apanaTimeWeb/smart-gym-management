import { Injectable } from '@nestjs/common';
import { SalesRepository } from '@/modules/erp/sales/sales.repository';
import { SALES_MESSAGES } from '@/modules/erp/sales/sales.constants';
import { SalesOverviewResponse } from '../sales.interfaces';

@Injectable()
export class SalesOverviewService {
  constructor(private readonly salesRepository: SalesRepository) {}

  async execute(): Promise<SalesOverviewResponse> {
    const monthlyRevenue = await this.salesRepository.getMonthlyOverview();
    return {
      success: true,
      message: SALES_MESSAGES.OVERVIEW_FETCHED_SUCCESS,
      data: { monthlyRevenue },
    };
  }
}
