// RESPONSIBILITY: Owns library mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerLibraryMutationService → ManagerLibraryRepository → audit log → typed domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerLibraryRepository } from '@/backend_manager/manager_modules/library/manager-library.repository';
import type { ManagerLibraryDomainData } from '@/backend_manager/manager_modules/library/library_types/manager-library.types';

@Injectable()
export class ManagerLibraryMutationService {
  constructor(private readonly repository: ManagerLibraryRepository, private readonly audit: ManagerCoreAuditLogRepository) {}

  /** @description Creates one library domain record and writes its audit entry within the active transaction. @param data - Validated payload. @param context - Active transaction context. @returns Created domain record. */
  async createExercise(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerLibraryDomainData> {
    const row = await this.repository.createExercise(data, context);
    await this.audit.append(context, 'MANAGER.LIBRARY.CREATED', 'library', row.id, null, row.payload);
    return row;
  }

  /** @description Updates one library domain record under the repository concurrency policy and writes an audit entry. @param id - Resource UUID. @param data - Validated patch. @param context - Active transaction context. @returns Updated domain record. */
  async updateExercise(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerLibraryDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await (this.repository as any).updateLibrary(id, data, context);
    await this.audit.append(context, 'MANAGER.LIBRARY.UPDATED', 'library', id, before.payload, row.payload);
    return row;
  }

  /** @description Soft-deletes one library domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deleteExercise(id: string, context: ManagerCoreTransactionContext): Promise<ManagerLibraryDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await (this.repository as any).deleteLibrary(id, context);
    await this.audit.append(context, 'MANAGER.LIBRARY.DELETED', 'library', id, before.payload, row.payload);
    return row;
  }

}
