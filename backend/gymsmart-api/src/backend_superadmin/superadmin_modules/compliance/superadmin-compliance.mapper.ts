// RESPONSIBILITY: Maps Compliance ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminComplianceMapper -> domain model -> response DTO.
import { SuperadminComplianceResponseDto } from '@/backend_superadmin/superadmin_modules/compliance/compliance_responses/superadmin-compliance-response.dto';
import type { SuperadminComplianceEntity } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.entity';
import type { SuperadminComplianceDomainModel } from '@/backend_superadmin/superadmin_modules/compliance/compliance_types/superadmin-compliance.interfaces';

/**
 * Primary Intent: Defines SuperadminComplianceMapper as the class-level contract for superadmin-compliance.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminComplianceMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminComplianceEntity): SuperadminComplianceDomainModel { return { ...entity } as SuperadminComplianceDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminComplianceEntity[]): SuperadminComplianceDomainModel[] { return entities.map(SuperadminComplianceMapper.toDomain); }

  /**
 * Primary Intent: Maps this module domain/projection into the stable API response DTO.
 * Edge Cases: Preserve exact field names, nullability, and enum semantics.
 * Side-Effects: Pure mapping only; no persistence or external side effects.
 * AI-Note: Do not add business logic or database access to this mapper.
 */

  static toResponse(domain: SuperadminComplianceDomainModel): SuperadminComplianceResponseDto {
    const dto = new SuperadminComplianceResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}
