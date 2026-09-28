// RESPONSIBILITY: Coordinates immutable domain-event creation from trusted application context.
// FLOW: Critical mutation → CoreImmutableDomainEventService → event repository → append-only event log.
import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CoreTransactionContext } from '@/backend_trainer/backend_core/core_database/core-transaction.context';
import { CoreImmutableDomainEventRepository } from '@/backend_trainer/backend_core/core_audit/core-immutable-domain-event.repository';
/**
 * Intent: Defines the CoreImmutableDomainEventService boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreImmutableDomainEventService {
  constructor(private readonly repository: CoreImmutableDomainEventRepository) {}
  /**
 * Intent: Executes the record operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes record inside the owning backend service/repository boundary without exposing ORM details.
 * @param eventName - Input for record.
 * @param aggregateType - Input for record.
 * @param aggregateId - Input for record.
 * @param payload - Input for record.
 * @param transaction - Input for record.
 * @returns {Promise<void>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async record(eventName: string, aggregateType: string, aggregateId: string, payload: Record<string, unknown>, transaction?: CoreTransactionContext): Promise<void> {
    await this.repository.insert({
      eventName,
      aggregateType,
      aggregateId,
      actorId: CoreRequestContext.getOptional()?.userId ?? null,
      occurredAt: new Date(),
      payload,
      eventVersion: 1,
    }, transaction);
  }
}
