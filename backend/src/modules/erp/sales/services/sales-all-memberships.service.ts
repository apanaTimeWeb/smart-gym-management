import { Injectable } from '@nestjs/common';
import { SalesRepository } from '@/modules/erp/sales/sales.repository';
import { SALES_MESSAGES } from '@/modules/erp/sales/sales.constants';
import { FindSalesDto } from '@/modules/erp/sales/dto/find-sales.dto';
import { AllMembershipsResponse } from '../sales.interfaces';

@Injectable()
export class SalesAllMembershipsService {
  constructor(private readonly salesRepository: SalesRepository) {}

  async execute(query: FindSalesDto): Promise<AllMembershipsResponse> {
    const { members, total } = await this.salesRepository.getAllMemberships(query);
    const limit = query.limit || 10;
    const page = query.page || 1;

    return {
      success: true,
      message: SALES_MESSAGES.ALL_MEMBERSHIPS_FETCHED_SUCCESS,
      data: { members, total, page, limit },
    };
  }
}
