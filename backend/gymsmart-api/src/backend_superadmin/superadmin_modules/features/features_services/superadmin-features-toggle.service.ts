// RESPONSIBILITY: Toggles one feature flag and records its lifecycle history; no HTTP transport concerns.
// FLOW: SuperadminFeaturesCommandController -> SuperadminFeaturesToggleService -> SuperadminFeaturesRepository -> mapper/response.
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { SuperadminFeaturesRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.repository';
import { SuperadminFeaturesResponseDto } from '@/backend_superadmin/superadmin_modules/features/features_responses/superadmin-features-response.dto';
import { SuperadminCoreUnitOfWorkService } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-unit-of-work.service';
import { SuperadminFeaturesMapper } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.mapper';

/**
 * Primary Intent: Defines SuperadminFeaturesToggleService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminFeaturesToggleService {
  constructor(private readonly repository: SuperadminFeaturesRepository, private readonly unitOfWork: SuperadminCoreUnitOfWorkService) {}

  /** @description Toggles a feature flag and appends a lifecycle history record.
   * @param id - Feature flag UUID.
   * @returns Updated feature flag response.
   * @throws NotFoundException when the feature flag does not exist.
   */
  /**
   * Primary Intent: Executes the `toggleFeatures` responsibility owned by this feature-local superadmin-features-toggle.service construct.
   * Edge Cases: Missing records, invalid inputs, and downstream failures must fail fast and preserve the owning feature's error contract.
   * Side-Effects: Only the documented persistence, cache, queue, event, or adapter effects of this method are allowed.
   * AI-Note: Preserve the explicit return type, single responsibility, dependency boundary, and repository/service separation when repairing this method.
   */
  /**
   * Primary Intent: Executes the toggleFeatures use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async toggleFeatures(id: string): Promise<SuperadminFeaturesResponseDto> {
    const updated = await this.unitOfWork.run(async () => {
      const current = await this.repository.findByIdForUpdateOrThrow(id);
      const isEnabled = !current.isGlobalEnabled;
      const history = Array.isArray(current.history) ? current.history : [];
      return this.repository.updateFeatureWithLock(id, {
        isGlobalEnabled: isEnabled,
        history: [...history, { id: randomUUID(), action: isEnabled ? 'ENABLED' : 'DISABLED', user: 'SUPERADMIN', timestamp: new Date().toISOString() }],
      });
    });
    return SuperadminFeaturesMapper.toResponse(SuperadminFeaturesMapper.toDomain(updated));
  }
}
