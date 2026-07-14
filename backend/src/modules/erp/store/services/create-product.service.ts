import { Injectable, Logger } from '@nestjs/common';
import { StoreRepository } from '@/modules/erp/store/store.repository';
import { CreateProductDto } from '@/modules/erp/store/dto/create-product.dto';
import { STORE_CONSTANTS } from '../store.constants';
import { ProductResponse } from '../store.interfaces';

@Injectable()
export class CreateProductService {
  private readonly logger = new Logger(CreateProductService.name);

  constructor(private readonly repository: StoreRepository) {}

  async execute(dto: CreateProductDto): Promise<ProductResponse> {
    this.logger.log(`Creating product: ${dto.name}`);
    const product = this.repository.productRepository.create(dto);
    const data = await this.repository.productRepository.save(product);
    return { success: true, message: STORE_CONSTANTS.SUCCESS_MESSAGES.PRODUCT_CREATED, data: data as any };
  }
}
