import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, LessThanOrEqual } from 'typeorm';
import { Product } from '@/modules/store/entities/product.entity';
import { Order } from '@/modules/store/entities/order.entity';
import { OrderItem } from '@/modules/store/entities/order-item.entity';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';
import { STORE_CONSTANTS } from './store.constants';

@Injectable()
export class StoreRepository {
  constructor(
    @InjectRepository(Product)
    public readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    public readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    public readonly orderItemRepository: Repository<OrderItem>,
    private readonly dataSource: DataSource,
  ) {}

  async findAllProducts(query: PaginationQueryDto) {
    return this.productRepository.findAndCount({
      where: { isActive: true },
      order: { name: STORE_CONSTANTS.SORT.ASC },
      take: query.limit,
      skip: query.offset,
    });
  }

  async findAllOrders(query: PaginationQueryDto) {
    return this.orderRepository.findAndCount({
      relations: ['items', 'items.product'],
      order: { id: STORE_CONSTANTS.SORT.DESC },
      take: query.limit,
      skip: query.offset,
    });
  }

  async getSummaryStats() {
    const totalProducts = await this.productRepository.count({
      where: { isActive: true },
    });
    const totalOrders = await this.orderRepository.count();

    const { totalRevenue } = await this.orderRepository
      .createQueryBuilder('order')
      .select('SUM(order.total)', 'totalRevenue')
      .getRawOne();

    const lowStockProducts = await this.productRepository.find({
      where: {
        isActive: true,
        stock: LessThanOrEqual(STORE_CONSTANTS.LOW_STOCK_THRESHOLD),
      },
    });

    return { totalProducts, totalOrders, totalRevenue, lowStockProducts };
  }

  getDataSource() {
    return this.dataSource;
  }
}
