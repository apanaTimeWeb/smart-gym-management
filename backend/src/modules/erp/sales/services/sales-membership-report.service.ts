import { Injectable } from '@nestjs/common';
import { SalesRepository } from '@/modules/erp/sales/sales.repository';
import { SALES_MESSAGES } from '@/modules/erp/sales/sales.constants';

@Injectable()
export class SalesMembershipReportService {
  constructor(private readonly salesRepository: SalesRepository) {}

  async execute() {
    const data = await this.salesRepository.getMembershipReport();
    return {
      success: true,
      message: SALES_MESSAGES.MEMBERSHIP_REPORT_FETCHED_SUCCESS,
      data,
    };
  }
}
