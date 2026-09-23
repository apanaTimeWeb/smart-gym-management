// RESPONSIBILITY: Maps Jobs ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> JobsMapper -> domain model -> response DTO.
import type { JobsEntity } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.entity';
import type { JobsDomainModel } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/types/jobs.interfaces';

export class JobsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: JobsEntity): JobsDomainModel { return { ...entity } as JobsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: JobsEntity[]): JobsDomainModel[] { return entities.map(JobsMapper.toDomain); }
}
