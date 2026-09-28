// RESPONSIBILITY: Records critical mutation audit trails from the mutation layer.
// FLOW: Mutation service/orchestrator → optional transaction context → audit repository → tenant audit_logs.
import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CoreTransactionContext } from '@/backend_trainer/backend_core/core_database/core-transaction.context';
import { CoreAuditRepository } from '@/backend_trainer/backend_core/core_audit/core-audit.repository';
/**
 * Intent: Defines the CoreAuditService boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, actor context, nullability, transaction propagation, and canonical error behavior.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Audit writes are append-oriented evidence and must remain inside the caller's transaction when one exists.
 */
@Injectable()
export class CoreAuditService {
  constructor(private readonly repository: CoreAuditRepository) {}
  /**
   * Intent: Records one mutation audit entry using the current request actor and optional transaction.
   * Edge Cases: Actor role can be absent in system contexts; old/new values may be null for create/delete actions.
   * Side Effects: Appends one tenant-scoped audit row through the repository.
   * AI Note: Never access ORM state here; keep persistence behind CoreAuditRepository.
   */
  /**
 * @description Executes record inside the owning backend service/repository boundary without exposing ORM details.
 * @param action - Input for record.
 * @param entityType - Input for record.
 * @param entityId - Input for record.
 * @param oldValue - Input for record.
 * @param newValue - Input for record.
 * @param transaction - Input for record.
 * @returns {Promise<void>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async record(action: string, entityType: string, entityId: string, oldValue: Record<string, unknown> | null, newValue: Record<string, unknown> | null, transaction?: CoreTransactionContext): Promise<void> {
    const context = CoreRequestContext.get();
    await this.repository.insert(this.buildEntry(action, entityType, entityId, oldValue, newValue, context), transaction);
  }
  /** Builds the repository input from trusted request context without performing persistence. */
  /**
 * @description Executes buildEntry inside the owning backend service/repository boundary without exposing ORM details.
 * @param action - Input for buildEntry.
 * @param entityType - Input for buildEntry.
 * @param entityId - Input for buildEntry.
 * @param oldValue - Input for buildEntry.
 * @param newValue - Input for buildEntry.
 * @param context - Input for buildEntry.
 * @returns {Parameters<CoreAuditRepository['insert']>[0]} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private buildEntry(action: string, entityType: string, entityId: string, oldValue: Record<string, unknown> | null, newValue: Record<string, unknown> | null, context: ReturnType<typeof CoreRequestContext.get>): Parameters<CoreAuditRepository['insert']>[0] {
    return { actorId: CoreRequestContext.getUserIdOrThrow(), actorRole: context.role ?? 'UNKNOWN', action, entityType, entityId, oldValue, newValue, ipAddress: context.ipAddress ?? null };
  }
}
