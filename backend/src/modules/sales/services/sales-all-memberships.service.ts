import { Injectable } from '@nestjs/common';
import { SalesRepository } from '@/modules/sales/sales.repository';
import { SALES_MESSAGES } from '@/modules/sales/sales.constants';
import { FindSalesDto } from '@/modules/sales/dto/find-sales.dto';

@Injectable()
export class SalesAllMembershipsService {
  constructor(private readonly salesRepository: SalesRepository) {}

  async execute(query: FindSalesDto) {
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
