// RESPONSIBILITY: Owns pt mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerPtMutationService → ManagerPtRepository → audit log → typed domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerPtRepository } from '@/backend_manager/manager_modules/pt/manager-pt.repository';
import type { PtDomainData } from '@/backend_manager/manager_modules/pt/pt_types/manager-pt.types';

@Injectable()
export class ManagerPtMutationService {
  constructor(private readonly repository: ManagerPtRepository, private readonly audit: ManagerCoreAuditLogRepository) {}

  /** @description Creates one pt domain record and writes its audit entry within the active transaction. @param data - Validated payload. @param context - Active transaction context. @returns Created domain record. */
  async createAssignment(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<PtDomainData> {
    const row = await this.repository.createAssignment(data, context);
    await this.audit.append(context, 'MANAGER.PT.CREATED', 'pt', row.id, null, row.payload);
    return row;
  }

  /** @description Updates one pt domain record under the repository concurrency policy and writes an audit entry. @param id - Resource UUID. @param data - Validated patch. @param context - Active transaction context. @returns Updated domain record. */
  async updateAssignment(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<PtDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updateById(id, data, context);
    await this.audit.append(context, 'MANAGER.PT.UPDATED', 'pt', id, before.payload, row.payload);
    return row;
  }

  /** @description Completes one PT session and audits the transition. @param id - Assignment UUID. @param data - Completion payload. @param context - Transaction context. @returns Updated assignment. */
  async completeSession(id:string,data:ManagerCoreJsonObject,context:ManagerCoreTransactionContext):Promise<PtDomainData>{const before=await this.repository.findByIdOrThrow(id);const row=await this.repository.completeSession(id,data,context);await this.audit.append(context,'MANAGER.PT.SESSION_COMPLETED','pt',id,before.payload,row.payload);return row;}

  /** @description Soft-deletes one pt domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deleteAssignment(id: string, context: ManagerCoreTransactionContext): Promise<PtDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.softDelete(id, context);
    await this.audit.append(context, 'MANAGER.PT.DELETED', 'pt', id, before.payload, row.payload);
    return row;
  }

}
