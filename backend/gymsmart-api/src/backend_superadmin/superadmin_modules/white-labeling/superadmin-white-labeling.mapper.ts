// RESPONSIBILITY: Maps WhiteLabeling ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminWhiteLabelingMapper -> domain model -> response DTO.
import type { SuperadminWhiteLabelingEntity } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.entity';
import type { SuperadminWhiteLabelingDomainModel } from '@/backend_superadmin/superadmin_modules/white-labeling/white-labeling_types/superadmin-white-labeling.interfaces';

/**
 * Primary Intent: Defines SuperadminWhiteLabelingMapper as the class-level contract for superadmin-white-labeling.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminWhiteLabelingMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminWhiteLabelingEntity): SuperadminWhiteLabelingDomainModel { return { ...entity } as SuperadminWhiteLabelingDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminWhiteLabelingEntity[]): SuperadminWhiteLabelingDomainModel[] { return entities.map(SuperadminWhiteLabelingMapper.toDomain); }
}
