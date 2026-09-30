// RESPONSIBILITY: Owns master-database transaction boundaries without exposing ORM transactions to business services.
// FLOW: Security use case → CoreMasterUnitOfWorkService → CoreMasterTransactionContext → repositories.
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import type { DataSource } from 'typeorm';
import { CoreMasterTransactionContext } from '@/backend_trainer/backend_core/core_database/core-master-transaction.context';
/**
 * Intent: Defines the CoreMasterUnitOfWorkService boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreMasterUnitOfWorkService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  /** Executes one all-or-nothing identity mutation on the master database. */
  /**
 * Intent: Executes the execute operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes execute inside the owning backend service/repository boundary without exposing ORM details.
 * @param callback - Input for execute.
 * @returns {Promise<T>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async execute<T>(callback: (context: CoreMasterTransactionContext) => Promise<T>): Promise<T> {
    return this.dataSource.transaction(async (manager) => callback(new CoreMasterTransactionContext(manager)));
  }
}
