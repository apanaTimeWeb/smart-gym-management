import { Injectable, Logger } from '@nestjs/common';
import { StoreRepository } from '@/modules/erp/store/store.repository';
import { UpdateProductDto } from '@/modules/erp/store/dto/update-product.dto';
import { ProductNotFoundException } from '@/modules/erp/store/store.exceptions';
import { STORE_CONSTANTS } from '../store.constants';
import { ProductResponse } from '../store.interfaces';

@Injectable()
export class UpdateProductService {
  private readonly logger = new Logger(UpdateProductService.name);

  constructor(private readonly repository: StoreRepository) {}

  async execute(id: number, dto: UpdateProductDto): Promise<ProductResponse> {
    this.logger.log(`Updating product ID: ${id}`);
    const existing = await this.repository.productRepository.findOne({
      where: { id },
    });

    if (!existing) {
      throw new ProductNotFoundException();
    }

    await this.repository.productRepository.update(id, dto);
    const data = await this.repository.productRepository.findOne({
      where: { id },
    });
    return { success: true, message: STORE_CONSTANTS.SUCCESS_MESSAGES.PRODUCT_UPDATED, data: data as any };
  }

  async remove(id: number): Promise<ProductResponse> {
    this.logger.log(`Soft removing product ID: ${id}`);
    const existing = await this.repository.productRepository.findOne({
      where: { id },
    });

    if (!existing) {
      throw new ProductNotFoundException();
    }

    await this.repository.productRepository.update(id, { isActive: false });
    const data = await this.repository.productRepository.findOne({
      where: { id },
    });
    return { success: true, message: STORE_CONSTANTS.SUCCESS_MESSAGES.PRODUCT_DELETED, data: data as any };
  }
}
