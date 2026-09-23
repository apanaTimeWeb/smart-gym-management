// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { StoreRepository } from '@/backend_manager/modules/backend_manager/store/repositories/store-repository';
import { StoreCreateOrderService } from '@/backend_manager/modules/backend_manager/store/services/store-create-order.service';
import { StoreCreateProductService } from '@/backend_manager/modules/backend_manager/store/services/store-create-product.service';
import { StoreDeleteProductService } from '@/backend_manager/modules/backend_manager/store/services/store-delete-product.service';
import { StoreFetchOrdersService } from '@/backend_manager/modules/backend_manager/store/services/store-fetch-orders.service';
import { StoreFetchProductsService } from '@/backend_manager/modules/backend_manager/store/services/store-fetch-products.service';
import { StoreFetchStoreSummaryService } from '@/backend_manager/modules/backend_manager/store/services/store-fetch-store-summary.service';
import { StoreOrchestratorService } from '@/backend_manager/modules/backend_manager/store/services/store-orchestrator.service';
import { StoreUpdateProductService } from '@/backend_manager/modules/backend_manager/store/services/store-update-product.service';
import { StoreCommandController } from '@/backend_manager/modules/backend_manager/store/store-command.controller';
import { StoreQueryController } from '@/backend_manager/modules/backend_manager/store/store-query.controller';

@Module({
  controllers: [StoreQueryController, StoreCommandController],
  providers: [StoreCreateProductService, StoreUpdateProductService, StoreDeleteProductService, StoreCreateOrderService, StoreFetchProductsService, StoreFetchOrdersService, StoreFetchStoreSummaryService, StoreRepository, StoreOrchestratorService],
  exports: [StoreRepository],
})
export class StoreModule {}
