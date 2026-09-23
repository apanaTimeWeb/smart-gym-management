// RESPONSIBILITY: Maps Jobs ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminJobsMapper -> domain model -> response DTO.
import type { SuperadminJobsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.entity';
import type { SuperadminJobsDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/types/superadmin-system-ops-jobs.interfaces';

export class SuperadminJobsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminJobsEntity): SuperadminJobsDomainModel { return { ...entity } as SuperadminJobsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminJobsEntity[]): SuperadminJobsDomainModel[] { return entities.map(SuperadminJobsMapper.toDomain); }
}
