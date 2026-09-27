// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerStoreMutationService } from '@/backend_manager/manager_modules/store/store_services/manager-store-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerStoreAuthorizationService } from '@/backend_manager/manager_modules/store/store_services/manager-store-authorization.service';

import { ManagerStoreRepository } from '@/backend_manager/manager_modules/store/manager-store.repository';
import { ManagerStoreCreateOrderService } from '@/backend_manager/manager_modules/store/store_services/manager-store-create-order.service';
import { ManagerStoreCreateProductService } from '@/backend_manager/manager_modules/store/store_services/manager-store-create-product.service';
import { ManagerStoreDeleteProductService } from '@/backend_manager/manager_modules/store/store_services/manager-store-delete-product.service';
import { ManagerStoreFindOrdersService } from '@/backend_manager/manager_modules/store/store_services/manager-store-find-orders.service';
import { ManagerStoreFindProductsService } from '@/backend_manager/manager_modules/store/store_services/manager-store-find-products.service';
import { ManagerStoreFindStoreSummaryService } from '@/backend_manager/manager_modules/store/store_services/manager-store-find-store-summary.service';
import { ManagerStoreOrchestratorService } from '@/backend_manager/manager_modules/store/store_services/manager-store-orchestrator.service';
import { ManagerStoreUpdateProductService } from '@/backend_manager/manager_modules/store/store_services/manager-store-update-product.service';
import { ManagerStoreCommandController } from '@/backend_manager/manager_modules/store/manager-store-command.controller';
import { ManagerStoreQueryController } from '@/backend_manager/manager_modules/store/manager-store-query.controller';

@Module({
  controllers: [ManagerStoreQueryController, ManagerStoreCommandController],
  providers: [ManagerStoreMutationService, ManagerStoreCreateProductService, ManagerStoreUpdateProductService, ManagerStoreDeleteProductService, ManagerStoreCreateOrderService, ManagerStoreFindProductsService, ManagerStoreFindOrdersService, ManagerStoreFindStoreSummaryService, ManagerStoreRepository, ManagerStoreOrchestratorService,
  ManagerStoreAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:store`, useFactory: (authorization: ManagerStoreAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('store', authorization); return authorization; }, inject: [ManagerStoreAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerStoreRepository],
})
export class ManagerStoreModule {}

export { ManagerStoreModule as StoreModule };
