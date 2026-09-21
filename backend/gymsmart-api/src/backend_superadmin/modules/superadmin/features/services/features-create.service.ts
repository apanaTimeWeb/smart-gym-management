// RESPONSIBILITY: Executes creation business flow for the features feature.
// FLOW: CommandController -> FeaturesCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { FeaturesRepository } from '@/backend_superadmin/modules/superadmin/features/features.repository';
import { FeaturesMapper } from '@/backend_superadmin/modules/superadmin/features/features.mapper';
import type { FeaturesCreateInput } from '@/backend_superadmin/modules/superadmin/features/types/features.interfaces';
import { FeaturesResponseDto } from '@/backend_superadmin/modules/superadmin/features/responses/features-response.dto';
@Injectable()
export class FeaturesCreateService {
  constructor(private readonly repository: FeaturesRepository) {}
  /** Creates a new features record. */
  async createFeatures(input: FeaturesCreateInput): Promise<FeaturesResponseDto> { return FeaturesMapper.toResponse(FeaturesMapper.toDomain(await this.repository.createFeatures(input))); }
}
