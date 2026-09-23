// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { StoreOrchestratorService } from '@/backend_manager/modules/backend_manager/store/services/store-orchestrator.service';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class StoreCreateProductService {
  constructor(private readonly orchestrator: StoreOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createProduct(data: CoreJsonObject): Promise<CoreJsonObject> {
    return this.orchestrator.createStore(data);
  }
}
