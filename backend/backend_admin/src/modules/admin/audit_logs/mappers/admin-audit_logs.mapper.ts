// RESPONSIBILITY: Translates the TypeORM Admin audit_logs entity into an ORM-independent domain model and frontend response.
// FLOW: AdminAuditLogsEntity → AdminAuditLogsMapper → domain/response object.

import { AdminAuditLogsDomainModel } from '@/modules/admin/audit_logs/domain/admin-audit_logs.domain';
import { AdminAuditLogsEntity } from '@/modules/admin/audit_logs/entities/admin-audit_logs-entity';

export class AdminAuditLogsMapper {
  /** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminAuditLogsEntity): AdminAuditLogsDomainModel {
    return {
      id: entity.id,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
      name: entity.name,
      status: entity.status,
      data: { ...entity.payload },
    };
  }

  /** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminAuditLogsDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
