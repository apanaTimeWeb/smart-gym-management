// RESPONSIBILITY: Maps WhiteLabeling ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminWhiteLabelingMapper -> domain model -> response DTO.
import type { SuperadminWhiteLabelingEntity } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.entity';
import type { SuperadminWhiteLabelingDomainModel } from '@/backend_superadmin/superadmin_modules/white-labeling/types/superadmin-white-labeling.interfaces';

export class SuperadminWhiteLabelingMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminWhiteLabelingEntity): SuperadminWhiteLabelingDomainModel { return { ...entity } as SuperadminWhiteLabelingDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminWhiteLabelingEntity[]): SuperadminWhiteLabelingDomainModel[] { return entities.map(SuperadminWhiteLabelingMapper.toDomain); }
}
