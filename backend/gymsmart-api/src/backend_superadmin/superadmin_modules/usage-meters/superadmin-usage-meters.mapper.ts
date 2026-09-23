// RESPONSIBILITY: Maps UsageMeters ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminUsageMetersMapper -> domain model -> response DTO.
import type { SuperadminUsageMetersEntity } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.entity';
import type { SuperadminUsageMetersDomainModel } from '@/backend_superadmin/superadmin_modules/usage-meters/types/superadmin-usage-meters.interfaces';

export class SuperadminUsageMetersMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminUsageMetersEntity): SuperadminUsageMetersDomainModel { return { ...entity } as SuperadminUsageMetersDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminUsageMetersEntity[]): SuperadminUsageMetersDomainModel[] { return entities.map(SuperadminUsageMetersMapper.toDomain); }
}
