// RESPONSIBILITY: Maps Infrastructure ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> InfrastructureMapper -> domain model -> response DTO.
import type { InfrastructureEntity } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure.entity';
import type { InfrastructureDomainModel } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/types/infrastructure.interfaces';

export class InfrastructureMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: InfrastructureEntity): InfrastructureDomainModel { return { ...entity } as InfrastructureDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: InfrastructureEntity[]): InfrastructureDomainModel[] { return entities.map(InfrastructureMapper.toDomain); }
}
