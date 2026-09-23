// RESPONSIBILITY: Maps GlobalAudit ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminGlobalAuditMapper -> domain model -> response DTO.
import { SuperadminGlobalAuditResponseDto } from '@/backend_superadmin/superadmin_modules/global-audit/responses/superadmin-global-audit-response.dto';
import type { SuperadminGlobalAuditEntity } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit.entity';
import type { SuperadminGlobalAuditDomainModel } from '@/backend_superadmin/superadmin_modules/global-audit/types/superadmin-global-audit.interfaces';

export class SuperadminGlobalAuditMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminGlobalAuditEntity): SuperadminGlobalAuditDomainModel { return { ...entity } as SuperadminGlobalAuditDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminGlobalAuditEntity[]): SuperadminGlobalAuditDomainModel[] { return entities.map(SuperadminGlobalAuditMapper.toDomain); }

  static toResponse(domain: SuperadminGlobalAuditDomainModel): SuperadminGlobalAuditResponseDto {
    const dto = new SuperadminGlobalAuditResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}