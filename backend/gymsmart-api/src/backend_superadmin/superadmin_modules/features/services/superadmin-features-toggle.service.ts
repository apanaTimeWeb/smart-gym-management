// RESPONSIBILITY: Toggles one feature flag and records its lifecycle history; no HTTP transport concerns.
// FLOW: SuperadminFeaturesCommandController -> SuperadminFeaturesToggleService -> SuperadminFeaturesRepository -> mapper/response.
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { SuperadminFeaturesRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.repository';
import { SuperadminFeaturesResponseDto } from '@/backend_superadmin/superadmin_modules/features/responses/superadmin-features-response.dto';
import { SuperadminUnitOfWorkService } from '@/backend_superadmin/superadmin_core/database/superadmin-core-unit-of-work.service';
import { SuperadminFeaturesMapper } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.mapper';

@Injectable()
export class SuperadminFeaturesToggleService {
  constructor(private readonly repository: SuperadminFeaturesRepository, private readonly unitOfWork: SuperadminUnitOfWorkService) {}

  /** @description Toggles a feature flag and appends a lifecycle history record.
   * @param id - Feature flag UUID.
   * @returns Updated feature flag response.
   * @throws NotFoundException when the feature flag does not exist.
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