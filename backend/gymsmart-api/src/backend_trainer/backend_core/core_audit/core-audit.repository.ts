// RESPONSIBILITY: Owns persistence of immutable audit log records for tenant mutation trails.
// FLOW: CoreAuditService → transaction-bound repository when provided → tenant audit_logs.

import { Injectable } from '@nestjs/common';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver';
import { CoreTransactionContext } from '@/backend_trainer/backend_core/core_database/core-transaction.context';
import { CoreAuditLogEntity } from '@/backend_trainer/backend_core/core_database/core-audit-log.entity';
import type { CoreAuditRecordInput } from '@/backend_trainer/backend_core/core_audit/core-audit-record.type';


/**
 * Intent: Defines the CoreAuditRepository boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreAuditRepository {
  constructor(private readonly resolver: CoreTenantDatasourceResolver) {}

  /** Inserts one audit record using the caller transaction when supplied. */
  /**
 * @description Executes insert inside the owning backend service/repository boundary without exposing ORM details.
 * @param input - Input for insert.
 * @param transaction - Input for insert.
 * @returns {Promise<void>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async insert(input: CoreAuditRecordInput, transaction?: CoreTransactionContext): Promise<void> {
    const repository = transaction?.getRepository(CoreAuditLogEntity) ?? (await this.resolver.getDataSource()).getRepository(CoreAuditLogEntity);
    const entity = repository.create(input);
    await repository.insert(entity);
  }
}
