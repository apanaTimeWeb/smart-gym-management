// RESPONSIBILITY: Owns membership renewal business behavior for the Manager plans feature.
// FLOW: Request DTO -> orchestrator renewal -> locked membership persistence -> audit/event -> empty response.
import { Injectable } from '@nestjs/common';
import { PlansOrchestratorService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-orchestrator.service';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
@Injectable()
export class ManagerPlansRenewMembershipService {
  constructor(private readonly orchestrator: PlansOrchestratorService) {}
  /** @description Renews an existing member membership. @param data - Member, plan and expiry-date payload. @returns Empty success contract. */
  async renewMembership(data: ManagerCoreJsonObject): Promise<Record<string, never>> { return this.orchestrator.renewMembership(data); }
}
export { ManagerPlansRenewMembershipService as PlansRenewMembershipService };
