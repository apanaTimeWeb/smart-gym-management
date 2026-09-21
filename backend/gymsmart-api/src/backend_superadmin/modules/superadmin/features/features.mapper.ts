// RESPONSIBILITY: Maps Features ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> FeaturesMapper -> domain model -> response DTO.
import type { FeatureFlagEntity } from '@/backend_superadmin/modules/superadmin/features/features.entity';
import type { FeaturesDomainModel } from '@/backend_superadmin/modules/superadmin/features/types/features.interfaces';
import { FeaturesResponseDto } from '@/backend_superadmin/modules/superadmin/features/responses/features-response.dto';

export class FeaturesMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: FeatureFlagEntity): FeaturesDomainModel { return { ...entity } as FeaturesDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: FeatureFlagEntity[]): FeaturesDomainModel[] { return entities.map(FeaturesMapper.toDomain); }

  static toResponse(domain: FeaturesDomainModel): FeaturesResponseDto {
    const dto = new FeaturesResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}
