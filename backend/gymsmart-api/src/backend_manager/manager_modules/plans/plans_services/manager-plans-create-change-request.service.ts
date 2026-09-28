// RESPONSIBILITY: Owns plan change-request creation business behavior for the Manager plans feature.
// FLOW: Request DTO -> orchestrator change-request mutation -> persistence -> audit/event -> empty response.
import { Injectable } from '@nestjs/common';
import { PlansOrchestratorService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-orchestrator.service';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
@Injectable()
export class ManagerPlansCreateChangeRequestService {
  constructor(private readonly orchestrator: PlansOrchestratorService) {}
  /** @description Creates one change-request resource. @param data - Plan ID and note. @returns Empty success contract. */
  async createChangeRequest(data: ManagerCoreJsonObject): Promise<Record<string, never>> { return this.orchestrator.createChangeRequest(data); }
}
export { ManagerPlansCreateChangeRequestService as PlansCreateChangeRequestService };
