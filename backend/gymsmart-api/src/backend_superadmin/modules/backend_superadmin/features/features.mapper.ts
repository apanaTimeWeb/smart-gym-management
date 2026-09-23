// RESPONSIBILITY: Maps Features ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> FeaturesMapper -> domain model -> response DTO.
import { FeaturesResponseDto } from '@/backend_superadmin/modules/backend_superadmin/features/responses/features-response.dto';
import type { FeaturesEntity } from '@/backend_superadmin/modules/backend_superadmin/features/features.entity';
import type { FeaturesDomainModel } from '@/backend_superadmin/modules/backend_superadmin/features/types/features.interfaces';

export class FeaturesMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: FeaturesEntity): FeaturesDomainModel { return { ...entity } as FeaturesDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: FeaturesEntity[]): FeaturesDomainModel[] { return entities.map(FeaturesMapper.toDomain); }

  static toResponse(domain: FeaturesDomainModel): FeaturesResponseDto {
    const dto = new FeaturesResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}