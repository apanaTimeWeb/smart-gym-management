import { Injectable, Logger } from '@nestjs/common';
import { StoreRepository } from '../store.repository';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';

@Injectable()
export class FindProductService {
  private readonly logger = new Logger(FindProductService.name);

  constructor(private readonly repository: StoreRepository) {}

  async execute(query: PaginationQueryDto) {
    this.logger.log(`Fetching products`);
    const [products, total] = await this.repository.findAllProducts(query);
    return { success: true, data: { products, total } };
  }
}
