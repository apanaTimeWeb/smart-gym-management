// RESPONSIBILITY: Maps Integrations ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> IntegrationsMapper -> domain model -> response DTO.
import { IntegrationsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/integrations/responses/integrations-response.dto';
import type { IntegrationsEntity } from '@/backend_superadmin/modules/backend_superadmin/integrations/integrations.entity';
import type { IntegrationsDomainModel } from '@/backend_superadmin/modules/backend_superadmin/integrations/types/integrations.interfaces';

export class IntegrationsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: IntegrationsEntity): IntegrationsDomainModel { return { id: entity.id, createdAt: entity.createdAt, updatedAt: entity.updatedAt, deletedAt: entity.deletedAt, tenantId: entity.tenantId, label: entity.label, status: entity.status, lastUsed: entity.lastUsed, rateLimit: entity.rateLimit, secretHash: entity.secretHash, scopes: entity.scopes }; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: IntegrationsEntity[]): IntegrationsDomainModel[] { return entities.map(IntegrationsMapper.toDomain); }

  static toResponse(domain: IntegrationsDomainModel): IntegrationsResponseDto {
    const dto = new IntegrationsResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}