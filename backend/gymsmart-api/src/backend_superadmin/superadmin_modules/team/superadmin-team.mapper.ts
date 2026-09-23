// RESPONSIBILITY: Maps Team ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminTeamMapper -> domain model -> response DTO.
import type { SuperadminTeamEntity } from '@/backend_superadmin/superadmin_modules/team/superadmin-team.entity';
import type { SuperadminTeamDomainModel } from '@/backend_superadmin/superadmin_modules/team/types/superadmin-team.interfaces';

export class SuperadminTeamMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminTeamEntity): SuperadminTeamDomainModel { return { ...entity } as SuperadminTeamDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminTeamEntity[]): SuperadminTeamDomainModel[] { return entities.map(SuperadminTeamMapper.toDomain); }
}
