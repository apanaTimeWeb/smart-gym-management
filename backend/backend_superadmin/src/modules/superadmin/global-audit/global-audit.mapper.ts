// RESPONSIBILITY: Maps GlobalAudit ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> GlobalAuditMapper -> domain model -> response DTO.
import type { AuditLogEntity } from '@/modules/superadmin/global-audit/global-audit.entity';
import type { GlobalAuditDomainModel } from '@/modules/superadmin/global-audit/types/global-audit.interfaces';

export class GlobalAuditMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: AuditLogEntity): GlobalAuditDomainModel { return { ...entity } as GlobalAuditDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: AuditLogEntity[]): GlobalAuditDomainModel[] { return entities.map(GlobalAuditMapper.toDomain); }
}
