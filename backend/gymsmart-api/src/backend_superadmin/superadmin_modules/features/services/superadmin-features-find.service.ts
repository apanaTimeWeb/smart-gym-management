// RESPONSIBILITY: Executes single-record retrieval for the features feature.
// FLOW: QueryController -> SuperadminFeaturesFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminFeaturesRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.repository';
import { SuperadminFeaturesMapper } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.mapper';
import { SuperadminFeaturesResponseDto } from '@/backend_superadmin/superadmin_modules/features/responses/superadmin-features-response.dto';
@Injectable()
export class SuperadminFeaturesFindService {
  constructor(private readonly repository: SuperadminFeaturesRepository) {}
  /** Retrieves one active features record by UUID. */
  async findFeaturesById(id: string): Promise<SuperadminFeaturesResponseDto> { return SuperadminFeaturesMapper.toResponse(SuperadminFeaturesMapper.toDomain(await this.repository.findByIdOrThrow(id))); }
}