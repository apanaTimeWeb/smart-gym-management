import { Injectable, Logger } from '@nestjs/common';
import { StoreRepository } from '@/modules/erp/store/store.repository';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';
import { STORE_CONSTANTS } from '../store.constants';
import { ProductListResponse } from '../store.interfaces';

@Injectable()
export class FindProductService {
  private readonly logger = new Logger(FindProductService.name);

  constructor(private readonly repository: StoreRepository) {}

  async execute(query: PaginationQueryDto): Promise<ProductListResponse> {
    this.logger.log(`Fetching products`);
    const [products, total] = await this.repository.findAllProducts(query);
    return { success: true, message: STORE_CONSTANTS.SUCCESS_MESSAGES.PRODUCT_FETCHED, data: { products: products as any, total } };
  }
}
