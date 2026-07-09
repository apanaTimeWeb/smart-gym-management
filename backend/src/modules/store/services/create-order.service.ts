import { Injectable, Logger } from '@nestjs/common';
import { StoreRepository } from '../store.repository';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from '../entities/product.entity';
import { Order } from '../entities/order.entity';
import { InsufficientStockException, OrderCreationFailedException, ProductNotFoundException } from '../store.exceptions';
import { STORE_CONSTANTS } from '../store.constants';

@Injectable()
export class CreateOrderService {
  private readonly logger = new Logger(CreateOrderService.name);

  constructor(private readonly repository: StoreRepository) {}

  async execute(dto: CreateOrderDto) {
    this.logger.log(`Creating order with ${dto.items.length} items`);
    const queryRunner = this.repository.getDataSource().createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      let total = 0;
      
      const order = queryRunner.manager.create(Order, {
        total: 0,
        method: dto.method,
        status: STORE_CONSTANTS.ORDER_STATUS.COMPLETED,
        notes: dto.notes,
      });
      const savedOrder = await queryRunner.manager.save(Order, order);

      for (const item of dto.items) {
        const product = await queryRunner.manager.findOne(Product, { 
          where: { id: item.productId },
          lock: { mode: 'pessimistic_write' }
        });
        
        if (!product || !product.isActive) {
          throw new ProductNotFoundException(`Product ${item.productId} not found or inactive`);
        }
        
        if (product.stock < item.qty) {
          throw new InsufficientStockException(`Product ${product.name} has only ${product.stock} items left`);
        }
        
        total += product.price * item.qty;
        
        const orderItem = queryRunner.manager.create(OrderItem, {
          order: savedOrder,
          product: product,
          qty: item.qty,
          price: product.price,
        });
        await queryRunner.manager.save(OrderItem, orderItem);

        product.stock -= item.qty;
        await queryRunner.manager.save(Product, product);
      }

      savedOrder.total = total;
      const data = await queryRunner.manager.save(Order, savedOrder);
      
      await queryRunner.commitTransaction();
      return { success: true, data };
    } catch (err) {
      this.logger.error(`Failed to create order: ${err.message}`);
      await queryRunner.rollbackTransaction();
      if (err instanceof ProductNotFoundException || err instanceof InsufficientStockException) {
        throw err;
      }
      throw new OrderCreationFailedException();
    } finally {
      await queryRunner.release();
    }
  }
}
