// RESPONSIBILITY: Owns audit_logs persistence using the current transaction manager when present; never returns ORM entities to services.
// FLOW: CoreAuditService -> CoreAuditLogRepository -> TypeORM -> audit_logs.

import { Injectable } from '@nestjs/common';

import { CoreAuditLogEntity } from '@/core/audit/core-audit-log.entity';
import { CoreBaseRepository } from '@/core/database/core-base-repository';

import type { CoreAuditLogInput } from '@/core/audit/core-audit-log.interfaces';
import type { CoreRequestContextService } from '@/core/context/core-request-context';
import type { DataSource } from 'typeorm';
@Injectable()
export class CoreAuditLogRepository extends CoreBaseRepository<CoreAuditLogEntity> {
  constructor(dataSource: DataSource, requestContext: CoreRequestContextService) {
    super(CoreAuditLogEntity, dataSource, requestContext);
  }

  /** @description Creates one audit row with current correlation metadata. @param input - Sanitized audit input. @returns Promise completion. */
  async createAuditLog(input: CoreAuditLogInput): Promise<void> {
    const now = new Date();
    const context = this.getRequestContext();
    const entity = this.getRepository().create({
      ...input,
      requestId: context?.requestId ?? null,
      traceId: context?.traceId ?? null,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    });
    await this.getRepository().insert(entity);
  }
}
