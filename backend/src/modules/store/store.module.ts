import { Module } from '@nestjs/common';
import { StoreController } from '@/modules/store/store.controller';
import { StoreService } from '@/modules/store/store.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Order, OrderItem])],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
