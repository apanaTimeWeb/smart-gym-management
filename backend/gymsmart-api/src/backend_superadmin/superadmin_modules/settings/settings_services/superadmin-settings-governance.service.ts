// RESPONSIBILITY: Projects live platform settings into the governance response consumed by Superadmin UI.
// FLOW: SuperadminSettingsGovernanceQueryController -> SuperadminSettingsGovernanceService -> SuperadminSettingsRepository -> platform settings rows.
import { Injectable } from '@nestjs/common';
import { SuperadminSettingsGovernanceResponseDto } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings-governance-response.dto';
import { SuperadminSettingsRepository } from '@/backend_superadmin/superadmin_modules/settings/superadmin-settings.repository';

/**
 * Primary Intent: Defines SuperadminSettingsGovernanceService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSettingsGovernanceService {
  constructor(private readonly repository: SuperadminSettingsRepository) {}
/**
 * Primary Intent: Executes the findSettingsGovernance use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findSettingsGovernance use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findSettingsGovernance(): Promise<SuperadminSettingsGovernanceResponseDto> {
    const groups = await this.repository.findGovernanceGroups();
    return {
      billing: groups.billing ?? [],
      security: groups.security ?? [],
      data: groups.data ?? [],
      communication: groups.communication ?? [],
    };
  }
}
