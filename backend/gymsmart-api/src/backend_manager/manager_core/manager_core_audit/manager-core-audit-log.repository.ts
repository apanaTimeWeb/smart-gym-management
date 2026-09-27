// RESPONSIBILITY: Owns backend core persistence/query boundary.
// FLOW: Trusted domain input → tenant-scoped query/mutation → ORM entity → mapper → domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogEntity } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.entity';
import { ManagerCoreRequestContextService } from '@/backend_manager/manager_core/manager_core_context/manager-core-request-context.service';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { redactAuditValue } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-value-redactor';

import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerCoreAuditLogRepository {
  constructor(private readonly context: ManagerCoreRequestContextService) {}

  /**
   * @description Persists a meaningful state transition inside the caller's transaction.
   * @param transaction - Active transaction context.
   * @param action - Business action name.
   * @param entityType - Logical entity type.
   * @param entityId - Entity UUID.
   * @param oldValue - Previous domain projection.
   * @param newValue - New domain projection.
   * @returns Nothing after the audit row is staged in the transaction.
   * @throws ManagerCoreContextException when authenticated actor context is absent.
   */
  async append(
    transaction: ManagerCoreTransactionContext,
    action: string,
    entityType: string,
    entityId: string,
    oldValue: ManagerCoreJsonObject | null,
    newValue: ManagerCoreJsonObject | null,
  ): Promise<void> {
    const actor = this.context.get();
    if (!actor.actorId || !actor.actorRole) throw new ManagerCoreContextException('Actor context missing', 'CORE.CONTEXT.ACTOR_MISSING');
    const repository = transaction.getRepository(ManagerCoreAuditLogEntity);
    const row = repository.create({ actorId: actor.actorId, actorRole: actor.actorRole, action, entityType, entityId, oldValue, newValue, ipAddress: actor.ipAddress ?? null });
    await repository.save(row);
  }
  /** Persists an audit event for an explicitly supplied actor, used by durable background workers. */
  async appendForActor(transaction: ManagerCoreTransactionContext, actorId: string, actorRole: import('@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants').ManagerCoreRole, action: string, entityType: string, entityId: string, oldValue: ManagerCoreJsonObject | null, newValue: ManagerCoreJsonObject | null): Promise<void> {
    const repository = transaction.getRepository(ManagerCoreAuditLogEntity);
    await repository.save(repository.create({ actorId, actorRole, action, entityType, entityId, oldValue, newValue, ipAddress: null }));
  }

}
