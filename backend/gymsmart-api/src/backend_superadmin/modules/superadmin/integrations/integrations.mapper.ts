// RESPONSIBILITY: Maps Integrations ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> IntegrationsMapper -> domain model -> response DTO.
import type { IntegrationKeyEntity } from '@/backend_superadmin/modules/superadmin/integrations/integrations.entity';
import type { IntegrationsDomainModel } from '@/backend_superadmin/modules/superadmin/integrations/types/integrations.interfaces';
import { IntegrationsResponseDto } from '@/backend_superadmin/modules/superadmin/integrations/responses/integrations-response.dto';

export class IntegrationsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: IntegrationKeyEntity): IntegrationsDomainModel { return { ...entity } as IntegrationsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: IntegrationKeyEntity[]): IntegrationsDomainModel[] { return entities.map(IntegrationsMapper.toDomain); }

  static toResponse(domain: IntegrationsDomainModel): IntegrationsResponseDto {
    const dto = new IntegrationsResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}
