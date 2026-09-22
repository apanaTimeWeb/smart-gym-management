// RESPONSIBILITY: Write use-case for POST /api/v1/manager/store/products.
// FLOW: Controller DTO -> StoreCreateProductService -> StoreOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { StoreOrchestratorService } from '@/backend_manager/modules/manager/store/services/store-orchestrator.service';

@Injectable()
export class StoreCreateProductService {
  constructor(private readonly orchestrator: StoreOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createProduct(data: CoreJsonObject): Promise<CoreJsonObject> {
    return this.orchestrator.createStore(data);
  }
}
