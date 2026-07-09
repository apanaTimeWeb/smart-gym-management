import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async findAllProducts(query: any) {
    const data = await this.productRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
    return { success: true, data };
  }

  async createProduct(dto: any) {
    const product = this.productRepository.create(dto);
    const data = await this.productRepository.save(product);
    return { success: true, data };
  }

  async updateProduct(id: number, dto: any) {
    await this.productRepository.update(id, dto);
    const data = await this.productRepository.findOne({ where: { id } });
    return { success: true, data };
  }

  async removeProduct(id: number) {
    await this.productRepository.update(id, { isActive: false });
    const data = await this.productRepository.findOne({ where: { id } });
    return { success: true, data };
  }

  async findAllOrders(query: any) {
    const orders = await this.orderRepository.find({
      relations: ['items', 'items.product'],
      order: { id: 'DESC' },
    });
    return { success: true, data: { orders, total: orders.length } };
  }

  async createOrder(dto: any) {
    let total = 0;
    const order = this.orderRepository.create({
      total: 0,
      method: dto.method,
      status: 'Completed',
      notes: dto.notes,
    });
    const savedOrder = await this.orderRepository.save(order);

    for (const item of dto.items) {
      const product = await this.productRepository.findOne({ where: { id: item.productId } });
      if (product) {
        total += product.price * item.qty;
        
        const orderItem = this.orderItemRepository.create({
          order: savedOrder,
          product: product,
          qty: item.qty,
          price: product.price,
        });
        await this.orderItemRepository.save(orderItem);

        product.stock -= item.qty;
        await this.productRepository.save(product);
      }
    }

    savedOrder.total = total;
    const data = await this.orderRepository.save(savedOrder);
    
    return { success: true, data };
  }

  async getStoreSummary() {
    const totalProducts = await this.productRepository.count({ where: { isActive: true } });
    const totalOrders = await this.orderRepository.count();
    
    const { totalRevenue } = await this.orderRepository
      .createQueryBuilder('order')
      .select('SUM(order.total)', 'totalRevenue')
      .getRawOne();

    const lowStockProducts = await this.productRepository.find({
      where: { isActive: true }, // TypeORM lacks simple lte in find object without LessThan/LessThanOrEqual, so we use QueryBuilder or import LessThanOrEqual.
    });
    
    // Filter low stock in memory for simplicity or import LessThanOrEqual
    const filteredLowStock = lowStockProducts.filter(p => p.stock <= 10);

    return { 
      success: true, 
      data: { 
        totalProducts, 
        totalOrders, 
        totalRevenue: parseFloat(totalRevenue) || 0, 
        lowStockProducts: filteredLowStock 
      } 
    };
  }
}
