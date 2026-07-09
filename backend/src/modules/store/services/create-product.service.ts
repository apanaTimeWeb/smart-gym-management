import { Injectable, Logger } from '@nestjs/common';
import { StoreRepository } from '../store.repository';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class CreateProductService {
  private readonly logger = new Logger(CreateProductService.name);

  constructor(private readonly repository: StoreRepository) {}

  async execute(dto: CreateProductDto) {
    this.logger.log(`Creating product: ${dto.name}`);
    const product = this.repository.productRepository.create(dto);
    const data = await this.repository.productRepository.save(product);
    return { success: true, data };
  }
}
