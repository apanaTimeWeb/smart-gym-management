// RESPONSIBILITY: Write use-case for PATCH /api/v1/manager/store/products/:id.
// FLOW: Controller DTO -> StoreUpdateProductService -> StoreOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { StoreOrchestratorService } from '@/modules/manager/store/services/store-orchestrator.service';

@Injectable()
export class StoreUpdateProductService {
  constructor(private readonly orchestrator: StoreOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async updateProduct(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.updateStoreById(data, id);
  }
}
