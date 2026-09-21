// RESPONSIBILITY: Maps Gyms ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> GymsMapper -> domain model -> response DTO.
import type { TenantEntity } from '@/modules/superadmin/gyms/gyms.entity';
import type { GymsDomainModel } from '@/modules/superadmin/gyms/types/gyms.interfaces';

export class GymsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: TenantEntity): GymsDomainModel { return { ...entity } as GymsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: TenantEntity[]): GymsDomainModel[] { return entities.map(GymsMapper.toDomain); }
}
