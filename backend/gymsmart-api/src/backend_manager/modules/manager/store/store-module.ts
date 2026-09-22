// RESPONSIBILITY: Registers the isolated Manager store feature boundary.
// FLOW: ManagerDomainModule -> StoreModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { StoreCommandController } from '@/backend_manager/modules/manager/store/store-command.controller';
import { StoreCreateOrderService } from '@/backend_manager/modules/manager/store/services/store-create-order.service';
import { StoreCreateProductService } from '@/backend_manager/modules/manager/store/services/store-create-product.service';
import { StoreDeleteProductService } from '@/backend_manager/modules/manager/store/services/store-delete-product.service';
import { StoreFetchOrdersService } from '@/backend_manager/modules/manager/store/services/store-fetch-orders.service';
import { StoreFetchProductsService } from '@/backend_manager/modules/manager/store/services/store-fetch-products.service';
import { StoreFetchStoreSummaryService } from '@/backend_manager/modules/manager/store/services/store-fetch-store-summary.service';
import { StoreOrchestratorService } from '@/backend_manager/modules/manager/store/services/store-orchestrator.service';
import { StoreQueryController } from '@/backend_manager/modules/manager/store/store-query.controller';
import { StoreRepository } from '@/backend_manager/modules/manager/store/repositories/store-repository';
import { StoreUpdateProductService } from '@/backend_manager/modules/manager/store/services/store-update-product.service';

@Module({
  controllers: [StoreQueryController, StoreCommandController],
  providers: [StoreCreateProductService, StoreUpdateProductService, StoreDeleteProductService, StoreCreateOrderService, StoreFetchProductsService, StoreFetchOrdersService, StoreFetchStoreSummaryService, StoreRepository, StoreOrchestratorService],
  exports: [StoreRepository],
})
export class StoreModule {}
