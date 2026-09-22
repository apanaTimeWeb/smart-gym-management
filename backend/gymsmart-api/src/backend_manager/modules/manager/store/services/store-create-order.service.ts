// RESPONSIBILITY: Write use-case for POST /api/v1/manager/store/orders.
// FLOW: Controller DTO -> StoreCreateOrderService -> StoreOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { StoreOrchestratorService } from '@/modules/manager/store/services/store-orchestrator.service';

@Injectable()
export class StoreCreateOrderService {
  constructor(private readonly orchestrator: StoreOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createOrder(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.createStore(data, id);
  }
}
