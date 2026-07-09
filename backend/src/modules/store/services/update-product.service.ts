import { Injectable, Logger } from '@nestjs/common';
import { StoreRepository } from '../store.repository';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductNotFoundException } from '../store.exceptions';

@Injectable()
export class UpdateProductService {
  private readonly logger = new Logger(UpdateProductService.name);

  constructor(private readonly repository: StoreRepository) {}

  async execute(id: number, dto: UpdateProductDto) {
    this.logger.log(`Updating product ID: ${id}`);
    const existing = await this.repository.productRepository.findOne({ where: { id } });
    
    if (!existing) {
      throw new ProductNotFoundException();
    }

    await this.repository.productRepository.update(id, dto);
    const data = await this.repository.productRepository.findOne({ where: { id } });
    return { success: true, data };
  }

  async remove(id: number) {
    this.logger.log(`Soft removing product ID: ${id}`);
    const existing = await this.repository.productRepository.findOne({ where: { id } });
    
    if (!existing) {
      throw new ProductNotFoundException();
    }

    await this.repository.productRepository.update(id, { isActive: false });
    const data = await this.repository.productRepository.findOne({ where: { id } });
    return { success: true, data };
  }
}
