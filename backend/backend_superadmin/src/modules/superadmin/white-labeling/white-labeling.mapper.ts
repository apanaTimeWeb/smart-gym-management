// RESPONSIBILITY: Maps WhiteLabeling ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> WhiteLabelingMapper -> domain model -> response DTO.
import type { WhiteLabelDomainEntity } from '@/modules/superadmin/white-labeling/white-labeling.entity';
import type { WhiteLabelingDomainModel } from '@/modules/superadmin/white-labeling/types/white-labeling.interfaces';

export class WhiteLabelingMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: WhiteLabelDomainEntity): WhiteLabelingDomainModel { return { ...entity } as WhiteLabelingDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: WhiteLabelDomainEntity[]): WhiteLabelingDomainModel[] { return entities.map(WhiteLabelingMapper.toDomain); }
}
