// RESPONSIBILITY: Maps UsageMeters ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> UsageMetersMapper -> domain model -> response DTO.
import type { UsageMeterEntity } from '@/modules/superadmin/usage-meters/usage-meters.entity';
import type { UsageMetersDomainModel } from '@/modules/superadmin/usage-meters/types/usage-meters.interfaces';

export class UsageMetersMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: UsageMeterEntity): UsageMetersDomainModel { return { ...entity } as UsageMetersDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: UsageMeterEntity[]): UsageMetersDomainModel[] { return entities.map(UsageMetersMapper.toDomain); }
}
