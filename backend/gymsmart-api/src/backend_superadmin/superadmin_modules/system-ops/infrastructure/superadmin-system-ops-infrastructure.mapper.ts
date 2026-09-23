// RESPONSIBILITY: Maps Infrastructure ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminInfrastructureMapper -> domain model -> response DTO.
import type { SuperadminInfrastructureEntity } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.entity';
import type { SuperadminInfrastructureDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/types/superadmin-system-ops-infrastructure.interfaces';

export class SuperadminInfrastructureMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminInfrastructureEntity): SuperadminInfrastructureDomainModel { return { ...entity } as SuperadminInfrastructureDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminInfrastructureEntity[]): SuperadminInfrastructureDomainModel[] { return entities.map(SuperadminInfrastructureMapper.toDomain); }
}
