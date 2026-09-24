// RESPONSIBILITY: Executes partial update business flow for the usage-meters feature.
// FLOW: CommandController -> SuperadminUsageMetersUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminUsageMetersRepository } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.repository';
import { SuperadminUsageMetersMapper } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.mapper';
import type { SuperadminUsageMetersDomainModel, SuperadminUsageMetersUpdateInput } from '@/backend_superadmin/superadmin_modules/usage-meters/usage-meters_types/superadmin-usage-meters.interfaces';
/**
 * Primary Intent: Defines SuperadminUsageMetersUpdateService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminUsageMetersUpdateService {
  constructor(private readonly repository: SuperadminUsageMetersRepository) {}
/**
 * Primary Intent: Executes the updateUsageMeters use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the updateUsageMeters use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateUsageMeters(id: string, input: SuperadminUsageMetersUpdateInput): Promise<SuperadminUsageMetersDomainModel> { return SuperadminUsageMetersMapper.toDomain(await this.repository.updateUsageMetersById(id, input)); }
}
