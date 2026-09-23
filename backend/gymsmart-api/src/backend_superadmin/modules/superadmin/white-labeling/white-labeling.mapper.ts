// RESPONSIBILITY: Maps WhiteLabeling ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> WhiteLabelingMapper -> domain model -> response DTO.
import type { WhiteLabelingEntity } from '@/backend_superadmin/modules/superadmin/white-labeling/white-labeling.entity';
import type { WhiteLabelingDomainModel } from '@/backend_superadmin/modules/superadmin/white-labeling/types/white-labeling.interfaces';

export class WhiteLabelingMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: WhiteLabelingEntity): WhiteLabelingDomainModel { return { ...entity } as WhiteLabelingDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: WhiteLabelingEntity[]): WhiteLabelingDomainModel[] { return entities.map(WhiteLabelingMapper.toDomain); }
}
