// RESPONSIBILITY: Executes creation business flow for the features feature.
// FLOW: CommandController -> SuperadminFeaturesCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminFeaturesRepository } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.repository';
import { SuperadminFeaturesMapper } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.mapper';
import { SuperadminFeaturesResponseDto } from '@/backend_superadmin/superadmin_modules/features/responses/superadmin-features-response.dto';
import type { SuperadminFeaturesCreateInput } from '@/backend_superadmin/superadmin_modules/features/types/superadmin-features.interfaces';
@Injectable()
export class SuperadminFeaturesCreateService {
  constructor(private readonly repository: SuperadminFeaturesRepository) {}
  /** Creates a new features record. */
  async createFeatures(input: SuperadminFeaturesCreateInput): Promise<SuperadminFeaturesResponseDto> { return SuperadminFeaturesMapper.toResponse(SuperadminFeaturesMapper.toDomain(await this.repository.createFeatures(input))); }
}