// RESPONSIBILITY: Maps Broadcasts ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> BroadcastsMapper -> domain model -> response DTO.
import type { BroadcastEntity } from '@/modules/superadmin/broadcasts/broadcasts.entity';
import type { BroadcastsDomainModel } from '@/modules/superadmin/broadcasts/types/broadcasts.interfaces';

export class BroadcastsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: BroadcastEntity): BroadcastsDomainModel { return { ...entity } as BroadcastsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: BroadcastEntity[]): BroadcastsDomainModel[] { return entities.map(BroadcastsMapper.toDomain); }
}
