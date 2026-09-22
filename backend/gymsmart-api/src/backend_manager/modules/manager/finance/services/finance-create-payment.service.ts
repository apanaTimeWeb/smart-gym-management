// RESPONSIBILITY: Write use-case for POST /api/v1/manager/finance/payments.
// FLOW: Controller DTO -> FinanceCreatePaymentService -> FinanceOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { FinanceOrchestratorService } from '@/backend_manager/modules/manager/finance/services/finance-orchestrator.service';

@Injectable()
export class FinanceCreatePaymentService {
  constructor(private readonly orchestrator: FinanceOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createPayment(data: CoreJsonObject): Promise<CoreJsonObject> {
    return this.orchestrator.createFinance(data);
  }
}
