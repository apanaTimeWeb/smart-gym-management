// RESPONSIBILITY: Owns store mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerStoreMutationService → ManagerStoreRepository → audit log → typed domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerStoreRepository } from '@/backend_manager/manager_modules/store/manager-store.repository';
import type { ManagerStoreDomainData } from '@/backend_manager/manager_modules/store/store_types/manager-store.types';

@Injectable()
export class ManagerStoreMutationService {
  constructor(private readonly repository: ManagerStoreRepository, private readonly audit: ManagerCoreAuditLogRepository) {}

  /** @description Creates one store domain record and writes its audit entry within the active transaction. @param data - Validated payload. @param context - Active transaction context. @returns Created domain record. */
  async createOrder(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerStoreDomainData> { return (this.repository as any).createOrder(data, context); }
  async createProduct(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerStoreDomainData> {
    const row = await this.repository.createProduct(data, context);
    await this.audit.append(context, 'MANAGER.STORE.CREATED', 'store', row.id, null, row.payload);
    return row;
  }

  /** @description Updates one store domain record under the repository concurrency policy and writes an audit entry. @param id - Resource UUID. @param data - Validated patch. @param context - Active transaction context. @returns Updated domain record. */
  async updateProduct(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerStoreDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updateProduct(id, data, context);
    await this.audit.append(context, 'MANAGER.STORE.UPDATED', 'store', id, before.payload, row.payload);
    return row;
  }

  /** @description Soft-deletes one store domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deleteProduct(id: string, context: ManagerCoreTransactionContext): Promise<ManagerStoreDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.deleteProduct(id, context);
    await this.audit.append(context, 'MANAGER.STORE.DELETED', 'store', id, before.payload, row.payload);
    return row;
  }

}
