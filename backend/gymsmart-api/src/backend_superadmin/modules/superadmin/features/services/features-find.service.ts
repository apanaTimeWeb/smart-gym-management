// RESPONSIBILITY: Executes single-record retrieval for the features feature.
// FLOW: QueryController -> FeaturesFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { FeaturesRepository } from '@/backend_superadmin/modules/backend_superadmin/features/features.repository';
import { FeaturesMapper } from '@/backend_superadmin/modules/backend_superadmin/features/features.mapper';
import { FeaturesResponseDto } from '@/backend_superadmin/modules/backend_superadmin/features/responses/features-response.dto';
@Injectable()
export class FeaturesFindService {
  constructor(private readonly repository: FeaturesRepository) {}
  /** Retrieves one active features record by UUID. */
  async findFeaturesById(id: string): Promise<FeaturesResponseDto> { return FeaturesMapper.toResponse(FeaturesMapper.toDomain(await this.repository.findByIdOrThrow(id))); }
}