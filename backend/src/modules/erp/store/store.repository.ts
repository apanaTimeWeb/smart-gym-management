import { Injectable, Inject } from '@nestjs/common';

import { Repository, DataSource, LessThanOrEqual, ILike } from 'typeorm';
import { Product } from '@/modules/erp/store/entities/product.entity';
import { Order } from '@/modules/erp/store/entities/order.entity';
import { OrderItem } from '@/modules/erp/store/entities/order-item.entity';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';
import { STORE_CONSTANTS } from './store.constants';

@Injectable()
export class StoreRepository {


    public readonly productRepository: Repository<Product>;
  public readonly orderRepository: Repository<Order>;
  public readonly orderItemRepository: Repository<OrderItem>;

  constructor(
    @Inject('TENANT_CONNECTION') private readonly dataSource: DataSource,
  ) {
    this.productRepository = this.dataSource.getRepository(Product);
    this.orderRepository = this.dataSource.getRepository(Order);
    this.orderItemRepository = this.dataSource.getRepository(OrderItem);
  }

  async findAllProducts(query: PaginationQueryDto) {
    return this.productRepository.findAndCount({
      where: { isActive: true },
      order: { name: STORE_CONSTANTS.SORT.ASC },
      take: query.limit,
      skip: query.offset,
    });
  }

  async findAllOrders(query: PaginationQueryDto) {
    const where: any = {};
    if (query.search) {
      where.method = ILike(`%${query.search}%`);
    }

    return this.orderRepository.findAndCount({
      where,
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
