// RESPONSIBILITY: Executes partial update business flow for the features feature.
// FLOW: CommandController -> FeaturesUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { FeaturesRepository } from '@/modules/superadmin/features/features.repository';
import { FeaturesMapper } from '@/modules/superadmin/features/features.mapper';
import type { FeaturesDomainModel, FeaturesUpdateInput } from '@/modules/superadmin/features/types/features.interfaces';
@Injectable()
export class FeaturesUpdateService {
  constructor(private readonly repository: FeaturesRepository) {}
  /** Updates a features record by UUID. */
  async updateFeatures(id: string, input: FeaturesUpdateInput): Promise<FeaturesDomainModel> { return FeaturesMapper.toDomain(await this.repository.updateFeaturesById(id, input)); }
}
