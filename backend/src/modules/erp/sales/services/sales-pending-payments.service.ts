import { Injectable } from '@nestjs/common';
import { SalesRepository } from '@/modules/erp/sales/sales.repository';
import { SALES_MESSAGES } from '@/modules/erp/sales/sales.constants';
import { FindSalesDto } from '@/modules/erp/sales/dto/find-sales.dto';
import { PendingPaymentsResponse } from '../sales.interfaces';

@Injectable()
export class SalesPendingPaymentsService {
  constructor(private readonly salesRepository: SalesRepository) {}

  async execute(query: FindSalesDto): Promise<PendingPaymentsResponse> {
    const { members, total } = await this.salesRepository.getPendingPayments(query);
    const limit = query.limit || 10;
    const page = query.page || 1;

    return {
      success: true,
      message: SALES_MESSAGES.PENDING_PAYMENTS_FETCHED_SUCCESS,
      data: { members, total, page, limit },
    };
  }
}
