// RESPONSIBILITY: Maps GlobalAudit ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> GlobalAuditMapper -> domain model -> response DTO.
import type { AuditLogEntity } from '@/backend_superadmin/modules/superadmin/global-audit/global-audit.entity';
import type { GlobalAuditDomainModel } from '@/backend_superadmin/modules/superadmin/global-audit/types/global-audit.interfaces';
import { GlobalAuditResponseDto } from '@/backend_superadmin/modules/superadmin/global-audit/responses/global-audit-response.dto';

export class GlobalAuditMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: AuditLogEntity): GlobalAuditDomainModel { return { ...entity } as GlobalAuditDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: AuditLogEntity[]): GlobalAuditDomainModel[] { return entities.map(GlobalAuditMapper.toDomain); }

  static toResponse(domain: GlobalAuditDomainModel): GlobalAuditResponseDto {
    const dto = new GlobalAuditResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}
