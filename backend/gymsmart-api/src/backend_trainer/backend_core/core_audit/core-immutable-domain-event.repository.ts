// RESPONSIBILITY: Persists append-only domain events inside the caller's tenant transaction.
// FLOW: CoreImmutableDomainEventService → repository → transaction-bound immutable_domain_events insert.

import { Injectable } from '@nestjs/common';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver';
import { CoreTransactionContext } from '@/backend_trainer/backend_core/core_database/core-transaction.context';
import { CoreImmutableDomainEventEntity } from '@/backend_trainer/backend_core/core_audit/core-immutable-domain-event.entity';

export interface CoreImmutableDomainEventInput {
  eventName: string;
  aggregateType: string;
  aggregateId: string;
  actorId: string | null;
  occurredAt: Date;
  payload: Record<string, unknown>;
  eventVersion: number;
}


/**
 * Intent: Defines the CoreImmutableDomainEventRepository boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreImmutableDomainEventRepository {
  constructor(private readonly resolver: CoreTenantDatasourceResolver) {}

  /** Intent: Inserts one immutable event into the tenant event log. Edge Cases: The caller transaction may roll back with the business mutation. Side-Effects: Adds a durable analytics event. AI Note: Never expose update/delete methods on this repository. */
  /**
 * @description Executes insert inside the owning backend service/repository boundary without exposing ORM details.
 * @param input - Input for insert.
 * @param transaction - Input for insert.
 * @returns {Promise<void>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async insert(input: CoreImmutableDomainEventInput, transaction?: CoreTransactionContext): Promise<void> {
    const repository = transaction?.getRepository(CoreImmutableDomainEventEntity) ?? (await this.resolver.getDataSource()).getRepository(CoreImmutableDomainEventEntity);
    await repository.insert(repository.create(input));
  }
}
