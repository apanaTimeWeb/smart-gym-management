// RESPONSIBILITY: Maps Infrastructure ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> InfrastructureMapper -> domain model -> response DTO.
import type { InfrastructureNodeEntity } from '@/modules/superadmin/system-ops/infrastructure/infrastructure.entity';
import type { InfrastructureDomainModel } from '@/modules/superadmin/system-ops/infrastructure/types/infrastructure.interfaces';

export class InfrastructureMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: InfrastructureNodeEntity): InfrastructureDomainModel { return { ...entity } as InfrastructureDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: InfrastructureNodeEntity[]): InfrastructureDomainModel[] { return entities.map(InfrastructureMapper.toDomain); }
}
