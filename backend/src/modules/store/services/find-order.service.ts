import { Injectable, Logger } from '@nestjs/common';
import { StoreRepository } from '../store.repository';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';

@Injectable()
export class FindOrderService {
  private readonly logger = new Logger(FindOrderService.name);

  constructor(private readonly repository: StoreRepository) {}

  async execute(query: PaginationQueryDto) {
    this.logger.log(`Fetching orders`);
    const [orders, total] = await this.repository.findAllOrders(query);
    return { success: true, data: { orders, total } };
  }
}
