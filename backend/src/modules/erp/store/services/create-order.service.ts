import { Injectable, Logger } from '@nestjs/common';
import { StoreRepository } from '@/modules/erp/store/store.repository';
import { CreateOrderDto } from '@/modules/erp/store/dto/create-order.dto';
import { OrderItem } from '@/modules/erp/store/entities/order-item.entity';
import { Product } from '@/modules/erp/store/entities/product.entity';
import { Order } from '@/modules/erp/store/entities/order.entity';
import {
  InsufficientStockException,
  OrderCreationFailedException,
  ProductNotFoundException,
} from '@/modules/erp/store/store.exceptions';
import { STORE_CONSTANTS } from '@/modules/erp/store/store.constants';
import { WhatsappService } from '@/modules/erp/store/services/whatsapp.service';
import { OrderResponse } from '../store.interfaces';

@Injectable()
export class CreateOrderService {
  private readonly logger = new Logger(CreateOrderService.name);

  constructor(
    private readonly repository: StoreRepository,
    private readonly whatsappService: WhatsappService,
  ) {}

  async execute(dto: CreateOrderDto): Promise<OrderResponse> {
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
        customerPhone: dto.customerPhone,
      });
      const savedOrder = await queryRunner.manager.save(Order, order);

      for (const item of dto.items) {
        const product = await queryRunner.manager.findOne(Product, {
          where: { id: item.productId },
          lock: { mode: 'pessimistic_write' },
        });

        if (!product || !product.isActive) {
          throw new ProductNotFoundException(
            `Product ${item.productId} not found or inactive`,
          );
        }

        if (product.stock < item.qty) {
          throw new InsufficientStockException(
            `Product ${product.name} has only ${product.stock} items left`,
          );
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

      if (dto.customerPhone) {
        let billMsg = `*Smart Gym Receipt*\nReceipt No: ORD-${savedOrder.id}\nDate: ${new Date().toLocaleDateString('en-IN')}\n\n*Items:*\n`;
        for (const item of dto.items) {
           const product = await queryRunner.manager.findOne(Product, { where: { id: item.productId } });
           const prodName = product?.name || 'Item';
           const prodPrice = product?.price || 0;
           billMsg += `- ${prodName} x${item.qty} (₹${item.qty * prodPrice})\n`;
        }
        billMsg += `\n*Total: ₹${total}*\nPayment Method: ${dto.method}\n\nThank you for shopping with us!`;
        
        // This won't block the API response
        this.whatsappService.sendBill(dto.customerPhone, billMsg);
      }

      return { success: true, message: STORE_CONSTANTS.SUCCESS_MESSAGES.ORDER_CREATED, data: data as any };
    } catch (err) {
      this.logger.error(`Failed to create order: ${err.message}`);
      await queryRunner.rollbackTransaction();
      if (
        err instanceof ProductNotFoundException ||
        err instanceof InsufficientStockException
      ) {
        throw err;
      }
      throw new OrderCreationFailedException();
    } finally {
      await queryRunner.release();
    }
  }
}
