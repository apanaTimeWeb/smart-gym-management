// RESPONSIBILITY: Toggles one feature flag and records its lifecycle history; no HTTP transport concerns.
// FLOW: FeaturesCommandController -> FeaturesToggleService -> FeaturesRepository -> mapper/response.
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { FeaturesRepository } from '@/backend_superadmin/modules/superadmin/features/features.repository';
import { FeaturesResponseDto } from '@/backend_superadmin/modules/superadmin/features/responses/features-response.dto';
import { UnitOfWorkService } from '@/backend_superadmin/core/database/unit-of-work.service';
import { FeaturesMapper } from '@/backend_superadmin/modules/superadmin/features/features.mapper';

@Injectable()
export class FeaturesToggleService {
  constructor(private readonly repository: FeaturesRepository, private readonly unitOfWork: UnitOfWorkService) {}

  /** @description Toggles a feature flag and appends a lifecycle history record.
   * @param id - Feature flag UUID.
   * @returns Updated feature flag response.
   * @throws NotFoundException when the feature flag does not exist.
   */
  async toggleFeatures(id: string): Promise<FeaturesResponseDto> {
    const updated = await this.unitOfWork.run(async () => {
      const current = await this.repository.findByIdForUpdateOrThrow(id);
      const isEnabled = !current.isGlobalEnabled;
      const history = Array.isArray(current.history) ? current.history : [];
      return this.repository.updateFeatureWithLock(id, {
        isGlobalEnabled: isEnabled,
        history: [...history, { id: randomUUID(), action: isEnabled ? 'ENABLED' : 'DISABLED', user: 'SUPERADMIN', timestamp: new Date().toISOString() }],
      });
    });
    return FeaturesMapper.toResponse(FeaturesMapper.toDomain(updated));
  }
}