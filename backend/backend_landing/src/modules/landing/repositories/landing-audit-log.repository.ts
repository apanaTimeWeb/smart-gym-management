// RESPONSIBILITY: Writes immutable mutation activity records inside the active transaction boundary.
// FLOW: Landing mutation repository → LandingAuditLogRepository → audit_logs.
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { LandingAuditLogEntity } from '@/modules/landing/entities/landing-audit-log.entity';
import type { TransactionContext } from '@/core/database/transaction-context';
import { LandingAuditActorRole } from '@/modules/landing/enums/landing-audit-actor-role.enum';
import { RequestContextService } from '@/core/context/request-context.service';

@Injectable()
export class LandingAuditLogRepository {
  constructor(private readonly requestContext: RequestContextService) {}

  /** @description Records a public Landing mutation in the tenant audit table. @param context - Active transaction context. @param action - Action code. @param entityType - Domain entity type. @param entityId - Created entity UUID. @param newValue - Sanitized auditable fields. */
  async recordCreate(
    context: TransactionContext,
    action: string,
    entityType: string,
    entityId: string,
    newValue: Record<string, unknown>,
  ): Promise<void> {
    const manager: EntityManager = context.manager;
    const entity = manager.create(LandingAuditLogEntity, {
      actorId: this.requestContext.get().userId,
      actorRole: LandingAuditActorRole.PUBLIC,
      action,
      entityType,
      entityId,
      oldValue: null,
      newValue,
      ipAddress: this.requestContext.get().ipAddress,
    });
    await manager.save(LandingAuditLogEntity, entity);
  }
}
