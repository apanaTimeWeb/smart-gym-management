// RESPONSIBILITY: Owns finance mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerFinanceMutationService → ManagerFinanceRepository → audit log → typed domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerFinanceRepository } from '@/backend_manager/manager_modules/finance/manager-finance.repository';
import type { FinanceDomainData } from '@/backend_manager/manager_modules/finance/finance_types/manager-finance.types';
import { ManagerFinanceLedgerService } from '@/backend_manager/manager_modules/finance/finance_ledger/manager-finance-ledger.service';
import { PaymentStatus } from '@/backend_manager/manager_modules/finance/manager-finance.constants';

@Injectable()
export class ManagerFinanceMutationService {
  constructor(private readonly repository: ManagerFinanceRepository, private readonly audit: ManagerCoreAuditLogRepository, private readonly ledger: ManagerFinanceLedgerService) {}

  /** @description Creates one finance domain record and writes its audit entry within the active transaction. @param data - Validated payload. @param context - Active transaction context. @returns Created domain record. */
  async createPayment(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<FinanceDomainData> {
    const row = await this.repository.createPayment(data, context);
    if (data.status === PaymentStatus.PAID || data.status === PaymentStatus.PARTIAL) await this.ledger.recordSettledPayment(row.id, data, context);
    await this.audit.append(context, 'MANAGER.FINANCE.CREATED', 'finance', row.id, null, row.payload);
    return row;
  }

  /** @description Updates one finance domain record under the repository concurrency policy and writes an audit entry. @param id - Resource UUID. @param data - Validated patch. @param context - Active transaction context. @returns Updated domain record. */
  async updatePayment(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<FinanceDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updateById(id, data, context);
    await this.ledger.recordSettlementAdjustment(id, before.payload, row.payload, context);
    await this.audit.append(context, 'MANAGER.FINANCE.UPDATED', 'finance', id, before.payload, row.payload);
    return row;
  }

  /** @description Soft-deletes one finance domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deletePayment(id: string, context: ManagerCoreTransactionContext): Promise<FinanceDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.softDelete(id, context);
    await this.ledger.recordSettlementAdjustment(id, before.payload, null, context);
    await this.audit.append(context, 'MANAGER.FINANCE.DELETED', 'finance', id, before.payload, row.payload);
    return row;
  }

}
