// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ManagerStoreOrchestratorService } from '@/backend_manager/manager_modules/store/store_services/manager-store-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerStoreUpdateProductService {
  constructor(private readonly orchestrator: ManagerStoreOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async updateProduct(data: ManagerCoreJsonObject, id?: string): ReturnType<ManagerStoreOrchestratorService['updateProduct']> {
    return this.orchestrator.updateProduct(data, id);
  }
}

export { ManagerStoreUpdateProductService as StoreUpdateProductService };
