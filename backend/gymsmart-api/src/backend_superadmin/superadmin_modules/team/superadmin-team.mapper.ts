// RESPONSIBILITY: Maps Team ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminTeamMapper -> domain model -> response DTO.
import type { SuperadminTeamEntity } from '@/backend_superadmin/superadmin_modules/team/superadmin-team.entity';
import type { SuperadminTeamDomainModel } from '@/backend_superadmin/superadmin_modules/team/team_types/superadmin-team.interfaces';

/**
 * Primary Intent: Defines SuperadminTeamMapper as the class-level contract for superadmin-team.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminTeamMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminTeamEntity): SuperadminTeamDomainModel { return { ...entity } as SuperadminTeamDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminTeamEntity[]): SuperadminTeamDomainModel[] { return entities.map(SuperadminTeamMapper.toDomain); }
}
