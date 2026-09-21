// RESPONSIBILITY: Executes single-record retrieval for the features feature.
// FLOW: QueryController -> FeaturesFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { FeaturesRepository } from '@/modules/superadmin/features/features.repository';
import { FeaturesMapper } from '@/modules/superadmin/features/features.mapper';
import type { FeaturesDomainModel } from '@/modules/superadmin/features/types/features.interfaces';
@Injectable()
export class FeaturesFindService {
  constructor(private readonly repository: FeaturesRepository) {}
  /** Retrieves one active features record by UUID. */
  async findFeaturesById(id: string): Promise<FeaturesDomainModel> { return FeaturesMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}
