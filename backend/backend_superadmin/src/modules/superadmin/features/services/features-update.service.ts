// RESPONSIBILITY: Executes partial update business flow for the features feature.
// FLOW: CommandController -> FeaturesUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { FeaturesRepository } from '@/modules/superadmin/features/features.repository';
import { FeaturesMapper } from '@/modules/superadmin/features/features.mapper';
import type { FeaturesUpdateInput } from '@/modules/superadmin/features/types/features.interfaces';
import { FeaturesResponseDto } from '@/modules/superadmin/features/responses/features-response.dto';
@Injectable()
export class FeaturesUpdateService {
  constructor(private readonly repository: FeaturesRepository) {}
  /** Updates a features record by UUID. */
  async updateFeatures(id: string, input: FeaturesUpdateInput): Promise<FeaturesResponseDto> { return FeaturesMapper.toResponse(FeaturesMapper.toDomain(await this.repository.updateFeaturesById(id, input))); }
}
