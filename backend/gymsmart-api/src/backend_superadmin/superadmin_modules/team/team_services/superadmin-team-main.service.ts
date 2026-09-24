// RESPONSIBILITY: Reads the canonical Superadmin team contract snapshot from PostgreSQL; no mock data is returned.
// FLOW: Controller -> SuperadminTeamMainService -> SuperadminTeamRepository -> latest snapshot -> canonical response envelope.
import { Injectable } from '@nestjs/common';
import { SuperadminTeamRepository } from '@/backend_superadmin/superadmin_modules/team/superadmin-team.repository';
import { SuperadminTeamNotFoundException } from '@/backend_superadmin/superadmin_modules/team/superadmin-team.exceptions';
import type { SuperadminTeamContractData } from '@/backend_superadmin/superadmin_modules/team/team_types/superadmin-team.interfaces';

/**
 * Primary Intent: Defines SuperadminTeamMainService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminTeamMainService {
  constructor(private readonly repository: SuperadminTeamRepository) {}
/**
 * Primary Intent: Executes the findTeamData use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findTeamData use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findTeamData(_input: Record<string, unknown> = {}): Promise<SuperadminTeamContractData> {
    const page = await this.repository.findPage({ page: 1, limit: 1, sortBy: 'updatedAt', sortOrder: 'DESC' });
    const payload = page.items[0]?.payload;
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new SuperadminTeamNotFoundException();
    const value = payload as Record<string, unknown>;
    if (!Array.isArray(value.users) || !Array.isArray(value.roles) || !Array.isArray(value.alerts)) throw new SuperadminTeamNotFoundException();
    return value as unknown as SuperadminTeamContractData;
  }
}
