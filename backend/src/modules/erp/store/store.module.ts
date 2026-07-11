import { DeleteProductService } from './services/delete-product.service';
import { DeleteProductController } from './controllers/delete-product.controller';
import { Module } from '@nestjs/common';


import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

import { StoreRepository } from './store.repository';

import { CreateProductController } from './controllers/create-product.controller';
import { FindProductController } from './controllers/find-product.controller';
import { UpdateProductController } from './controllers/update-product.controller';
import { CreateOrderController } from './controllers/create-order.controller';
import { FindOrderController } from './controllers/find-order.controller';
import { StoreSummaryController } from './controllers/store-summary.controller';

import { CreateProductService } from './services/create-product.service';
import { FindProductService } from './services/find-product.service';
import { UpdateProductService } from './services/update-product.service';
import { CreateOrderService } from './services/create-order.service';
import { FindOrderService } from './services/find-order.service';
import { StoreSummaryService } from './services/store-summary.service';

@Module({
  imports: [],
  controllers: [DeleteProductController, 
    CreateProductController,
    FindProductController,
    UpdateProductController,
    CreateOrderController,
    FindOrderController,
    StoreSummaryController,
  ],
  providers: [DeleteProductService, 
    StoreRepository,
    CreateProductService,
    FindProductService,
    UpdateProductService,
    CreateOrderService,
    FindOrderService,
    StoreSummaryService,
  ],
})
export class StoreModule {}
