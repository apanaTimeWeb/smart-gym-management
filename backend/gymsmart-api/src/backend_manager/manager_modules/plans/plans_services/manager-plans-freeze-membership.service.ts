// RESPONSIBILITY: Owns membership freeze business behavior for the Manager plans feature.
// FLOW: Request DTO -> orchestrator freeze -> locked membership persistence -> audit/event -> empty response.
import { Injectable } from '@nestjs/common';
import { PlansOrchestratorService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-orchestrator.service';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
@Injectable()
export class ManagerPlansFreezeMembershipService {
  constructor(private readonly orchestrator: PlansOrchestratorService) {}
  /** @description Freezes an existing member membership for a bounded date range. @param data - Member and freeze dates. @returns Empty success contract. */
  async freezeMembership(data: ManagerCoreJsonObject): Promise<Record<string, never>> { return this.orchestrator.freezeMembership(data); }
}
export { ManagerPlansFreezeMembershipService as PlansFreezeMembershipService };
