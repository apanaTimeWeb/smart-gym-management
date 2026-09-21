// RESPONSIBILITY: Maps Integrations ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> IntegrationsMapper -> domain model -> response DTO.
import type { IntegrationKeyEntity } from '@/modules/superadmin/integrations/integrations.entity';
import type { IntegrationsDomainModel } from '@/modules/superadmin/integrations/types/integrations.interfaces';

export class IntegrationsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: IntegrationKeyEntity): IntegrationsDomainModel { return { ...entity } as IntegrationsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: IntegrationKeyEntity[]): IntegrationsDomainModel[] { return entities.map(IntegrationsMapper.toDomain); }
}
