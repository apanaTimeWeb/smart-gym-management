// RESPONSIBILITY: Executes partial update business flow for the features feature.
// FLOW: CommandController -> SuperadminFeaturesUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminFeaturesRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.repository';
import { SuperadminFeaturesMapper } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.mapper';
import { SuperadminFeaturesResponseDto } from '@/backend_superadmin/superadmin_modules/features/responses/superadmin-features-response.dto';
import type { SuperadminFeaturesUpdateInput } from '@/backend_superadmin/superadmin_modules/features/types/superadmin-features.interfaces';
@Injectable()
export class SuperadminFeaturesUpdateService {
  constructor(private readonly repository: SuperadminFeaturesRepository) {}
  /** Updates a features record by UUID. */
  async updateFeatures(id: string, input: SuperadminFeaturesUpdateInput): Promise<SuperadminFeaturesResponseDto> { return SuperadminFeaturesMapper.toResponse(SuperadminFeaturesMapper.toDomain(await this.repository.updateFeaturesById(id, input))); }
}