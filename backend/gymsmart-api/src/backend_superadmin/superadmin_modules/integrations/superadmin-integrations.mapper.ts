// RESPONSIBILITY: Maps Integrations ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminIntegrationsMapper -> domain model -> response DTO.
import { SuperadminIntegrationsResponseDto } from '@/backend_superadmin/superadmin_modules/integrations/integrations_responses/superadmin-integrations-response.dto';
import type { SuperadminIntegrationsEntity } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.entity';
import type { SuperadminIntegrationsDomainModel } from '@/backend_superadmin/superadmin_modules/integrations/integrations_types/superadmin-integrations.interfaces';

/**
 * Primary Intent: Defines SuperadminIntegrationsMapper as the class-level contract for superadmin-integrations.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminIntegrationsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminIntegrationsEntity): SuperadminIntegrationsDomainModel { return { id: entity.id, createdAt: entity.createdAt, updatedAt: entity.updatedAt, deletedAt: entity.deletedAt, tenantId: entity.tenantId, label: entity.label, status: entity.status, lastUsed: entity.lastUsed, rateLimit: entity.rateLimit, secretHash: entity.secretHash, scopes: entity.scopes }; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminIntegrationsEntity[]): SuperadminIntegrationsDomainModel[] { return entities.map(SuperadminIntegrationsMapper.toDomain); }

  /**
 * Primary Intent: Maps this module domain/projection into the stable API response DTO.
 * Edge Cases: Preserve exact field names, nullability, and enum semantics.
 * Side-Effects: Pure mapping only; no persistence or external side effects.
 * AI-Note: Do not add business logic or database access to this mapper.
 */

  static toResponse(domain: SuperadminIntegrationsDomainModel): SuperadminIntegrationsResponseDto {
    const dto = new SuperadminIntegrationsResponseDto();
    dto.id = domain.id;
    dto.tenantId = domain.tenantId;
    dto.label = domain.label;
    dto.status = domain.status;
    dto.lastUsed = domain.lastUsed?.toISOString() ?? null;
    dto.rateLimit = domain.rateLimit;
    return dto;
  }
}
