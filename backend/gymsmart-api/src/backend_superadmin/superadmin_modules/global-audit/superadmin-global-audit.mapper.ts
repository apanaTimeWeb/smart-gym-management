// RESPONSIBILITY: Maps GlobalAudit ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminGlobalAuditMapper -> domain model -> response DTO.
import { SuperadminGlobalAuditResponseDto } from '@/backend_superadmin/superadmin_modules/global-audit/global-audit_responses/superadmin-global-audit-response.dto';
import type { SuperadminGlobalAuditEntity } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit.entity';
import type { SuperadminGlobalAuditDomainModel } from '@/backend_superadmin/superadmin_modules/global-audit/global-audit_types/superadmin-global-audit.interfaces';

/**
 * Primary Intent: Defines SuperadminGlobalAuditMapper as the class-level contract for superadmin-global-audit.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminGlobalAuditMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminGlobalAuditEntity): SuperadminGlobalAuditDomainModel { return { ...entity } as SuperadminGlobalAuditDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminGlobalAuditEntity[]): SuperadminGlobalAuditDomainModel[] { return entities.map(SuperadminGlobalAuditMapper.toDomain); }

  /**
 * Primary Intent: Maps this module domain/projection into the stable API response DTO.
 * Edge Cases: Preserve exact field names, nullability, and enum semantics.
 * Side-Effects: Pure mapping only; no persistence or external side effects.
 * AI-Note: Do not add business logic or database access to this mapper.
 */

  static toResponse(domain: SuperadminGlobalAuditDomainModel): SuperadminGlobalAuditResponseDto {
    const dto = new SuperadminGlobalAuditResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}
