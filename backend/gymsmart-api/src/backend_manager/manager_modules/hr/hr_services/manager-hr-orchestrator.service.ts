// RESPONSIBILITY: Owns the hr transaction boundary and post-commit lifecycle-event emission; no direct repository access or business logic.
// FLOW: Controller-facing service → UnitOfWork → ManagerHrMutationService → repository → commit → event registry.
import { Injectable } from '@nestjs/common';

import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { ManagerHrMutationService } from '@/backend_manager/manager_modules/hr/hr_services/manager-hr-mutation.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { HrDomainData } from '@/backend_manager/manager_modules/hr/hr_types/manager-hr.types';

@Injectable()
export class ManagerHrOrchestratorService {
  constructor(private readonly uow: ManagerCoreUnitOfWorkService, private readonly events: ManagerCoreEventService, private readonly mutation: ManagerHrMutationService) {}

  /** @description Executes staff creation inside a UnitOfWork. @param data - Validated staff payload. @returns Created staff. */
  async createStaff(data: ManagerCoreJsonObject): Promise<HrDomainData> {
    let result: HrDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.createStaff(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_HR_CREATED, { feature: 'hr', id: result.id, action: 'STAFF_CREATED' });
    return result;
  }

  /** @description Executes payroll creation inside a UnitOfWork. @param data - Validated payroll payload. @returns Created payroll. */
  async createPayroll(data: ManagerCoreJsonObject): Promise<HrDomainData> {
    let result: HrDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.createPayroll(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_HR_UPDATED, { feature: 'hr', id: result.id, action: 'PAYROLL_CREATED' });
    return result;
  }

  /** @description Executes staff update inside a UnitOfWork. @param data - Validated patch. @param id - Staff UUID. @returns Updated staff. */
  async updateStaff(data: ManagerCoreJsonObject, id?: string): Promise<HrDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: HrDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updateStaff(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_HR_UPDATED, { feature: 'hr', id, action: 'STAFF_UPDATED' });
    return result;
  }

  /** @description Executes payroll update inside a UnitOfWork. @param data - Validated patch. @param id - Payroll UUID. @returns Updated payroll. */
  async updatePayroll(data: ManagerCoreJsonObject, id?: string): Promise<HrDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: HrDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updatePayroll(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_HR_UPDATED, { feature: 'hr', id, action: 'PAYROLL_UPDATED' });
    return result;
  }

  /** @description Executes payroll status change inside a UnitOfWork. @param data - Validated status payload. @param id - Payroll UUID. @returns Updated payroll. */
  async updatePayrollStatus(data: ManagerCoreJsonObject, id?: string): Promise<HrDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: HrDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updatePayrollStatus(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_HR_UPDATED, { feature: 'hr', id, action: 'PAYROLL_STATUS_UPDATED' });
    return result;
  }

  /** @description Generates payroll records inside one UnitOfWork. @param data - Month payload. @returns Payroll collection. */
  async generatePayrolls(data: ManagerCoreJsonObject): Promise<{ payrolls: HrDomainData[] }> { const month = String(data.month ?? ''); if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) throw new ManagerCoreContextException('Payroll month must use YYYY-MM format.', 'HR.PAYROLL.MONTH_INVALID'); let result: HrDomainData[] | undefined; await this.uow.run(async (context) => { result = await this.mutation.generatePayrolls(month, context); }); if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT'); this.events.emit(ManagerCoreEventRegistry.MANAGER_HR_UPDATED, { feature: 'hr', action: 'PAYROLL_GENERATED', count: result.length }); return { payrolls: result }; }

  /** @description Gives a staff advance inside one UnitOfWork. @param data - Advance payload. @returns Advance response. */
  async giveStaffAdvance(data: ManagerCoreJsonObject): Promise<{ advanceAmount: number; currency: string }> { const staffId = String(data.staffId ?? ''); const amount = Number(data.amount ?? -1); if (!staffId || !Number.isSafeInteger(amount) || amount < 0) throw new ManagerCoreContextException('Staff and amount are required.', 'HR.LEDGER.INPUT_INVALID'); let result: HrDomainData | undefined; await this.uow.run(async (context) => { result = await this.mutation.giveStaffAdvance(staffId, amount, data, context); }); if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT'); this.events.emit(ManagerCoreEventRegistry.MANAGER_HR_UPDATED, { feature: 'hr', id: staffId, action: 'ADVANCE_GIVEN' }); return { advanceAmount: Number(result.payload.advanceAmount ?? 0), currency: String(result.payload.currency ?? data.currency ?? 'INR') }; }

  /** @description Pays staff due inside one UnitOfWork. @param data - Due payload. @returns Payment response. */
  async payStaffDue(data: ManagerCoreJsonObject): Promise<{ paidAmount: number; currency: string }> { const staffId = String(data.staffId ?? ''); const amount = Number(data.amount ?? -1); if (!staffId || !Number.isSafeInteger(amount) || amount < 0) throw new ManagerCoreContextException('Staff and amount are required.', 'HR.LEDGER.INPUT_INVALID'); let result: HrDomainData | undefined; await this.uow.run(async (context) => { result = await this.mutation.payStaffDue(staffId, amount, data, context); }); if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT'); this.events.emit(ManagerCoreEventRegistry.MANAGER_HR_UPDATED, { feature: 'hr', id: staffId, action: 'DUE_PAID' }); return { paidAmount: amount, currency: String(result.payload.currency ?? data.currency ?? 'INR') }; }

  /** @description Executes soft delete inside a UnitOfWork and emits the committed lifecycle event. @param id - Resource UUID. @returns Soft-deleted domain record. */
  async deleteStaff(id?: string): Promise<HrDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: HrDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.deleteStaff(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_HR_DELETED, { feature: 'hr', id });
    return result;
  }
}

export { ManagerHrOrchestratorService as HrOrchestratorService };
