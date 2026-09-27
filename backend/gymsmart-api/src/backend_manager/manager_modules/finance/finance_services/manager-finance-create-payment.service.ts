// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { FinanceOrchestratorService } from '@/backend_manager/manager_modules/finance/finance_services/manager-finance-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerFinanceCreatePaymentService {
  constructor(private readonly orchestrator: FinanceOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async createPayment(data: ManagerCoreJsonObject): ReturnType<FinanceOrchestratorService['createPayment']> {
    return this.orchestrator.createPayment(data);
  }
}

export { ManagerFinanceCreatePaymentService as FinanceCreatePaymentService };
