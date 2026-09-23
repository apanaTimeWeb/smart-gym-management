// RESPONSIBILITY: Executes partial update business flow for the features feature.
// FLOW: CommandController -> FeaturesUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { FeaturesRepository } from '@/backend_superadmin/modules/backend_superadmin/features/features.repository';
import { FeaturesMapper } from '@/backend_superadmin/modules/backend_superadmin/features/features.mapper';
import { FeaturesResponseDto } from '@/backend_superadmin/modules/backend_superadmin/features/responses/features-response.dto';
import type { FeaturesUpdateInput } from '@/backend_superadmin/modules/backend_superadmin/features/types/features.interfaces';
@Injectable()
export class FeaturesUpdateService {
  constructor(private readonly repository: FeaturesRepository) {}
  /** Updates a features record by UUID. */
  async updateFeatures(id: string, input: FeaturesUpdateInput): Promise<FeaturesResponseDto> { return FeaturesMapper.toResponse(FeaturesMapper.toDomain(await this.repository.updateFeaturesById(id, input))); }
}