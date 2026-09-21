// RESPONSIBILITY: Writes immutable Landing mutation activity records inside the active transaction boundary.
// FLOW: Landing service → LandingAuditLogRepository → CoreBaseRepository → TypeORM → audit_logs.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/core/database/base.repository';

import { RequestContextService } from '@/core/context/request-context.service';

import { LandingAuditLogEntity } from '@/modules/landing/entities/landing-audit-log.entity';

import { LandingAuditActorRole } from '@/modules/landing/enums/landing-audit-actor-role.enum';

import type { Repository } from 'typeorm';

import type { TransactionContext } from '@/core/database/transaction-context';


@Injectable()
export class LandingAuditLogRepository extends CoreBaseRepository<LandingAuditLogEntity> {
  constructor(private readonly requestContext: RequestContextService) {
    super(LandingAuditLogEntity);
  }

  /**
   * @description Records a public Landing mutation in the tenant audit table.
   * @param context - Active transaction context.
   * @param action - Action code.
   * @param entityType - Domain entity type.
   * @param entityId - Created entity UUID.
   * @param newValue - Sanitized auditable fields.
   * @returns Resolves after the audit row is persisted.
   */
  async recordCreate(
    context: TransactionContext,
    action: string,
    entityType: string,
    entityId: string,
    newValue: Record<string, unknown>,
  ): Promise<void> {
    const repository: Repository<LandingAuditLogEntity> = this.repositoryFor(context);
    const request = this.requestContext.get();
    const entity = repository.create({
      actorId: request.userId,
      actorRole: LandingAuditActorRole.PUBLIC,
      action,
      entityType,
      entityId,
      oldValue: null,
      newValue,
      ipAddress: request.ipAddress,
    });
    await repository.save(entity);
  }
}
