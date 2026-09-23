// RESPONSIBILITY: Maps Team ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> TeamMapper -> domain model -> response DTO.
import type { TeamEntity } from '@/backend_superadmin/modules/backend_superadmin/team/team.entity';
import type { TeamDomainModel } from '@/backend_superadmin/modules/backend_superadmin/team/types/team.interfaces';

export class TeamMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: TeamEntity): TeamDomainModel { return { ...entity } as TeamDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: TeamEntity[]): TeamDomainModel[] { return entities.map(TeamMapper.toDomain); }
}
