// RESPONSIBILITY: Maps Features ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminFeaturesMapper -> domain model -> response DTO.
import { SuperadminFeaturesResponseDto } from '@/backend_superadmin/superadmin_modules/features/features_responses/superadmin-features-response.dto';
import type { SuperadminFeaturesEntity } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.entity';
import type { SuperadminFeaturesDomainModel } from '@/backend_superadmin/superadmin_modules/features/features_types/superadmin-features.interfaces';

/**
 * Primary Intent: Defines SuperadminFeaturesMapper as the class-level contract for superadmin-features.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminFeaturesMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminFeaturesEntity): SuperadminFeaturesDomainModel { return { ...entity } as SuperadminFeaturesDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminFeaturesEntity[]): SuperadminFeaturesDomainModel[] { return entities.map(SuperadminFeaturesMapper.toDomain); }

  /**
 * Primary Intent: Maps this module domain/projection into the stable API response DTO.
 * Edge Cases: Preserve exact field names, nullability, and enum semantics.
 * Side-Effects: Pure mapping only; no persistence or external side effects.
 * AI-Note: Do not add business logic or database access to this mapper.
 */

  static toResponse(domain: SuperadminFeaturesDomainModel): SuperadminFeaturesResponseDto {
    const dto = new SuperadminFeaturesResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}
