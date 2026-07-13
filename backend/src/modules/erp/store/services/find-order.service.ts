import { Injectable, Logger } from '@nestjs/common';
import { StoreRepository } from '@/modules/erp/store/store.repository';
import { FindOrderDto } from '@/modules/erp/store/dto/find-order.dto';

@Injectable()
export class FindOrderService {
  private readonly logger = new Logger(FindOrderService.name);

  constructor(private readonly repository: StoreRepository) {}

  async execute(query: FindOrderDto) {
    this.logger.log(`Fetching orders`);
    const [orders, total] = await this.repository.findAllOrders(query);
    return { success: true, data: { orders, total } };
  }
}
