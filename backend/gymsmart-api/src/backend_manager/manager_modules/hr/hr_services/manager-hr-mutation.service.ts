// RESPONSIBILITY: Owns hr mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerHrMutationService → ManagerHrRepository → audit log → typed domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerHrRepository } from '@/backend_manager/manager_modules/hr/manager-hr.repository';
import type { ManagerHrDomainData } from '@/backend_manager/manager_modules/hr/hr_types/manager-hr.types';

@Injectable()
export class ManagerHrMutationService {
  constructor(private readonly repository: ManagerHrRepository, private readonly audit: ManagerCoreAuditLogRepository) {}

  /** @description Creates a staff record and audits it within the active transaction. @param data - Validated staff payload. @param context - Transaction context. @returns Created staff. */
  async createStaff(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerHrDomainData> {
    const row = await this.repository.createStaff(data, context);
    await this.audit.append(context, 'MANAGER.HR.STAFF_CREATED', 'staff', row.id, null, row.payload);
    return row;
  }

  /** @description Creates a payroll record and audits it within the active transaction. @param data - Validated payroll payload. @param context - Transaction context. @returns Created payroll. */
  async createPayroll(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerHrDomainData> {
    const row = await this.repository.createPayroll(data, context);
    await this.audit.append(context, 'MANAGER.HR.PAYROLL_CREATED', 'payroll', row.id, null, row.payload);
    return row;
  }

  /** @description Updates one staff record under pessimistic locking. @param id - Staff UUID. @param data - Validated patch. @param context - Transaction context. @returns Updated staff. */
  async updateStaff(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerHrDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updateStaff(id, data, context);
    await this.audit.append(context, 'MANAGER.HR.STAFF_UPDATED', 'staff', id, before.payload, row.payload);
    return row;
  }

  /** @description Updates one payroll record under pessimistic locking. @param id - Payroll UUID. @param data - Validated patch. @param context - Transaction context. @returns Updated payroll. */
  async updatePayroll(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerHrDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updatePayroll(id, data, context);
    await this.audit.append(context, 'MANAGER.HR.PAYROLL_UPDATED', 'payroll', id, before.payload, row.payload);
    return row;
  }

  /** @description Updates payroll status under pessimistic locking. @param id - Payroll UUID. @param data - Validated status payload. @param context - Transaction context. @returns Updated payroll. */
  async updatePayrollStatus(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerHrDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updatePayrollStatus(id, data, context);
    await this.audit.append(context, 'MANAGER.HR.PAYROLL_STATUS_UPDATED', 'payroll', id, before.payload, row.payload);
    return row;
  }

  /** @description Generates payroll rows and audits each generated record. @param month - Payroll month. @param context - Transaction context. @returns Payroll rows. */
  async generatePayrolls(month: string, context: ManagerCoreTransactionContext): Promise<ManagerHrDomainData[]> { const rows = await this.repository.generatePayrolls(month, context); for (const row of rows) await this.audit.append(context, 'MANAGER.HR.PAYROLL_GENERATED', 'hr', row.id, null, row.payload); return rows; }

  /** @description Gives staff an advance and audits the ledger state. @param staffId - Staff UUID. @param amount - Integer minor units. @param payment - Payment metadata. @param context - Transaction context. @returns Updated staff. */
  async giveStaffAdvance(staffId:string, amount:number, payment:ManagerCoreJsonObject, context:ManagerCoreTransactionContext):Promise<ManagerHrDomainData>{const before=await this.repository.findByIdOrThrow(staffId);const row=await this.repository.giveStaffAdvance(staffId,amount,payment,context);await this.audit.append(context,'MANAGER.HR.ADVANCE_GIVEN','hr',staffId,before.payload,row.payload);return row;}

  /** @description Pays staff due and audits the ledger state. @param staffId - Staff UUID. @param amount - Integer minor units. @param payment - Payment metadata. @param context - Transaction context. @returns Updated staff. */
  async payStaffDue(staffId:string, amount:number, payment:ManagerCoreJsonObject, context:ManagerCoreTransactionContext):Promise<ManagerHrDomainData>{const before=await this.repository.findByIdOrThrow(staffId);const row=await this.repository.payStaffDue(staffId,amount,payment,context);await this.audit.append(context,'MANAGER.HR.DUE_PAID','hr',staffId,before.payload,row.payload);return row;}

  /** @description Soft-deletes one hr domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deleteStaff(id: string, context: ManagerCoreTransactionContext): Promise<ManagerHrDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.deleteStaff(id, context);
    await this.audit.append(context, 'MANAGER.HR.DELETED', 'hr', id, before.payload, row.payload);
    return row;
  }

}
