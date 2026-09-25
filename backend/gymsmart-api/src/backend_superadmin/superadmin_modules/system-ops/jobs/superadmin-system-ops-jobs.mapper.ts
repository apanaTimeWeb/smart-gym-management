// RESPONSIBILITY: Maps Jobs ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminSystemOpsJobsMapper -> domain model -> response DTO.
import type { SuperadminSystemOpsJobsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.entity';
import type { SuperadminJobsDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/jobs_types/superadmin-system-ops-jobs.interfaces';

/**
 * Primary Intent: Defines SuperadminSystemOpsJobsMapper as the class-level contract for superadmin-system-ops-jobs.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSystemOpsJobsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminSystemOpsJobsEntity): SuperadminJobsDomainModel { return { ...entity } as SuperadminJobsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminSystemOpsJobsEntity[]): SuperadminJobsDomainModel[] { return entities.map(SuperadminSystemOpsJobsMapper.toDomain); }
}
