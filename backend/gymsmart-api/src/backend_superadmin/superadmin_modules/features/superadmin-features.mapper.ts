// RESPONSIBILITY: Maps Features ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminFeaturesMapper -> domain model -> response DTO.
import { SuperadminFeaturesResponseDto } from '@/backend_superadmin/superadmin_modules/features/responses/superadmin-features-response.dto';
import type { SuperadminFeaturesEntity } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.entity';
import type { SuperadminFeaturesDomainModel } from '@/backend_superadmin/superadmin_modules/features/types/superadmin-features.interfaces';

export class SuperadminFeaturesMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminFeaturesEntity): SuperadminFeaturesDomainModel { return { ...entity } as SuperadminFeaturesDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminFeaturesEntity[]): SuperadminFeaturesDomainModel[] { return entities.map(SuperadminFeaturesMapper.toDomain); }

  static toResponse(domain: SuperadminFeaturesDomainModel): SuperadminFeaturesResponseDto {
    const dto = new SuperadminFeaturesResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}