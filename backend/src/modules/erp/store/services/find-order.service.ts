import { Injectable, Logger } from '@nestjs/common';
import { StoreRepository } from '@/modules/erp/store/store.repository';
import { FindOrderDto } from '@/modules/erp/store/dto/find-order.dto';
import { STORE_CONSTANTS } from '../store.constants';
import { OrderListResponse } from '../store.interfaces';

@Injectable()
export class FindOrderService {
  private readonly logger = new Logger(FindOrderService.name);

  constructor(private readonly repository: StoreRepository) {}

  async execute(query: FindOrderDto): Promise<OrderListResponse> {
    this.logger.log(`Fetching orders`);
    const [orders, total] = await this.repository.findAllOrders(query);
    return { success: true, message: STORE_CONSTANTS.SUCCESS_MESSAGES.ORDER_FETCHED, data: { orders: orders as any, total } };
  }
}
