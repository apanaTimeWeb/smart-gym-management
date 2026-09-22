// RESPONSIBILITY: Registers the isolated Manager store feature boundary.
// FLOW: ManagerDomainModule -> StoreModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { StoreCommandController } from '@/modules/manager/store/store-command.controller';
import { StoreCreateOrderService } from '@/modules/manager/store/services/store-create-order.service';
import { StoreCreateProductService } from '@/modules/manager/store/services/store-create-product.service';
import { StoreDeleteProductService } from '@/modules/manager/store/services/store-delete-product.service';
import { StoreFetchOrdersService } from '@/modules/manager/store/services/store-fetch-orders.service';
import { StoreFetchProductsService } from '@/modules/manager/store/services/store-fetch-products.service';
import { StoreFetchStoreSummaryService } from '@/modules/manager/store/services/store-fetch-store-summary.service';
import { StoreOrchestratorService } from '@/modules/manager/store/services/store-orchestrator.service';
import { StoreQueryController } from '@/modules/manager/store/store-query.controller';
import { StoreRepository } from '@/modules/manager/store/repositories/store-repository';
import { StoreUpdateProductService } from '@/modules/manager/store/services/store-update-product.service';

@Module({
  controllers: [StoreQueryController, StoreCommandController],
  providers: [StoreCreateProductService, StoreUpdateProductService, StoreDeleteProductService, StoreCreateOrderService, StoreFetchProductsService, StoreFetchOrdersService, StoreFetchStoreSummaryService, StoreRepository, StoreOrchestratorService],
  exports: [StoreRepository],
})
export class StoreModule {}
