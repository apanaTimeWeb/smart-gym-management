// RESPONSIBILITY: Owns membership activation business behavior for the Manager plans feature.
// FLOW: Request DTO -> orchestrator activation -> locked membership persistence -> audit/event -> empty response.
import { Injectable } from '@nestjs/common';
import { PlansOrchestratorService } from '@/backend_manager/manager_modules/plans/plans_services/manager-plans-orchestrator.service';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerPlansActivateMembershipService {
  constructor(private readonly orchestrator: PlansOrchestratorService) {}
  /** @description Activates one member membership. @param data - Member, plan and start-date payload. @returns Empty success contract. */
  async activateMembership(data: ManagerCoreJsonObject): Promise<Record<string, never>> { return this.orchestrator.activateMembership(data); }
}
export { ManagerPlansActivateMembershipService as PlansActivateMembershipService };
