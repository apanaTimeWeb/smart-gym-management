// RESPONSIBILITY: Maps Jobs ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> JobsMapper -> domain model -> response DTO.
import type { BackgroundJobEntity } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.entity';
import type { JobsDomainModel } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/types/jobs.interfaces';

export class JobsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: BackgroundJobEntity): JobsDomainModel { return { ...entity } as JobsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: BackgroundJobEntity[]): JobsDomainModel[] { return entities.map(JobsMapper.toDomain); }
}
