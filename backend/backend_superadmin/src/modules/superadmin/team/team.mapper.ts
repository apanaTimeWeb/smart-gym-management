// RESPONSIBILITY: Maps Team ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> TeamMapper -> domain model -> response DTO.
import type { TeamSnapshotEntity } from '@/modules/superadmin/team/team.entity';
import type { TeamDomainModel } from '@/modules/superadmin/team/types/team.interfaces';

export class TeamMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: TeamSnapshotEntity): TeamDomainModel { return { ...entity } as TeamDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: TeamSnapshotEntity[]): TeamDomainModel[] { return entities.map(TeamMapper.toDomain); }
}
