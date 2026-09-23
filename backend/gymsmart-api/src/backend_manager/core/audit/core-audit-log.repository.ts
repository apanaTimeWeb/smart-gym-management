// RESPONSIBILITY: Owns backend core persistence/query boundary.
// FLOW: Trusted domain input → tenant-scoped query/mutation → ORM entity → mapper → domain result.
import { Injectable } from '@nestjs/common';

import { CoreAuditLogEntity } from '@/backend_manager/core/audit/core-audit-log.entity';
import { CoreRequestContextService } from '@/backend_manager/core/context/core-request-context.service';
import { CoreContextException } from '@/backend_manager/core/exceptions/core-context.exception';

import type { CoreTransactionContext } from '@/backend_manager/core/database/core-transaction-context';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class CoreAuditLogRepository {
  constructor(private readonly context: CoreRequestContextService) {}

  /**
   * @description Persists a meaningful state transition inside the caller's transaction.
   * @param transaction - Active transaction context.
   * @param action - Business action name.
   * @param entityType - Logical entity type.
   * @param entityId - Entity UUID.
   * @param oldValue - Previous domain projection.
   * @param newValue - New domain projection.
   * @returns Nothing after the audit row is staged in the transaction.
   * @throws CoreContextException when authenticated actor context is absent.
   */
  async append(
    transaction: CoreTransactionContext,
    action: string,
    entityType: string,
    entityId: string,
    oldValue: CoreJsonObject | null,
    newValue: CoreJsonObject | null,
  ): Promise<void> {
    const actor = this.context.get();
    if (!actor.actorId || !actor.actorRole) throw new CoreContextException('Actor context missing', 'CORE.CONTEXT.ACTOR_MISSING');
    const repository = transaction.getRepository(CoreAuditLogEntity);
    const row = repository.create({ actorId: actor.actorId, actorRole: actor.actorRole, action, entityType, entityId, oldValue, newValue });
    await repository.save(row);
  }
}
