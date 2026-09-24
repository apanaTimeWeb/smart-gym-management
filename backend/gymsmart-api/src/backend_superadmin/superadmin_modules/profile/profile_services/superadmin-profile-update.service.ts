// RESPONSIBILITY: Handles the update endpoint for the profile feature without owning unrelated business flows.
// FLOW: Controller -> SuperadminProfileUpdateService -> feature repository/infra dependency -> typed result.
import { Injectable } from '@nestjs/common';
import { SuperadminProfileRepository } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.repository';
import { SuperadminProfileMapper } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.mapper';
import type { SuperadminProfileDomainModel, SuperadminProfileUpdateInput } from '@/backend_superadmin/superadmin_modules/profile/profile_types/superadmin-profile.interfaces';
/**
 * Primary Intent: Defines SuperadminProfileUpdateService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminProfileUpdateService {
  constructor(private readonly repository: SuperadminProfileRepository) {}
/**
 * Primary Intent: Executes the updateProfile use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the updateProfile use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateProfile(id: string, input: SuperadminProfileUpdateInput): Promise<SuperadminProfileDomainModel> {
    return SuperadminProfileMapper.toDomain(await this.repository.updateProfileById(id, input));
  }
}
