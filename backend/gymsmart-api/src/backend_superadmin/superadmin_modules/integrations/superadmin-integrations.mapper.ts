// RESPONSIBILITY: Maps Integrations ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminIntegrationsMapper -> domain model -> response DTO.
import { SuperadminIntegrationsResponseDto } from '@/backend_superadmin/superadmin_modules/integrations/responses/superadmin-integrations-response.dto';
import type { SuperadminIntegrationsEntity } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.entity';
import type { SuperadminIntegrationsDomainModel } from '@/backend_superadmin/superadmin_modules/integrations/types/superadmin-integrations.interfaces';

export class SuperadminIntegrationsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminIntegrationsEntity): SuperadminIntegrationsDomainModel { return { id: entity.id, createdAt: entity.createdAt, updatedAt: entity.updatedAt, deletedAt: entity.deletedAt, tenantId: entity.tenantId, label: entity.label, status: entity.status, lastUsed: entity.lastUsed, rateLimit: entity.rateLimit, secretHash: entity.secretHash, scopes: entity.scopes }; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminIntegrationsEntity[]): SuperadminIntegrationsDomainModel[] { return entities.map(SuperadminIntegrationsMapper.toDomain); }

  static toResponse(domain: SuperadminIntegrationsDomainModel): SuperadminIntegrationsResponseDto {
    const dto = new SuperadminIntegrationsResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}