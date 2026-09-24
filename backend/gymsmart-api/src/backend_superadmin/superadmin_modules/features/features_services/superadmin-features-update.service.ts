// RESPONSIBILITY: Executes partial update business flow for the features feature.
// FLOW: CommandController -> SuperadminFeaturesUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminFeaturesRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.repository';
import { SuperadminFeaturesMapper } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.mapper';
import { SuperadminFeaturesResponseDto } from '@/backend_superadmin/superadmin_modules/features/features_responses/superadmin-features-response.dto';
import type { SuperadminFeaturesUpdateInput } from '@/backend_superadmin/superadmin_modules/features/features_types/superadmin-features.interfaces';
/**
 * Primary Intent: Defines SuperadminFeaturesUpdateService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminFeaturesUpdateService {
  constructor(private readonly repository: SuperadminFeaturesRepository) {}
/**
 * Primary Intent: Executes the updateFeatures use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the updateFeatures use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateFeatures(id: string, input: SuperadminFeaturesUpdateInput): Promise<SuperadminFeaturesResponseDto> { return SuperadminFeaturesMapper.toResponse(SuperadminFeaturesMapper.toDomain(await this.repository.updateFeaturesById(id, input))); }
}
