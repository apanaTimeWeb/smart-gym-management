// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { HttpStatus, Injectable } from '@nestjs/common';

import { ManagerCoreConfigService } from '@/backend_manager/manager_core/manager_core_config/manager-core-config.service';
import { CoreBaseRepository } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.repository';
import { ManagerCoreTenantDatasourceService } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-datasource.service';
import { ManagerCoreNotFoundException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-not-found.exception';
import { ManagerCoreBusinessException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-business.exception';
import { ManagerCoreEncryptionService } from '@/backend_manager/manager_core/manager_core_security/manager-core-encryption.service';
import { buildPaginationMeta } from '@/backend_manager/manager_core/manager_core_utils/manager-core-pagination.utils';

import { HrAllowedSortFields } from '@/backend_manager/manager_modules/hr/manager-hr.constants';
import { HrEntity } from '@/backend_manager/manager_modules/hr/manager-hr.entity';
import { HrMapper } from '@/backend_manager/manager_modules/hr/manager-hr.mapper';

import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject, ManagerCoreJsonValue } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { HrDomainData, HrListResult } from '@/backend_manager/manager_modules/hr/hr_types/manager-hr.types';

@Injectable()
export class ManagerHrRepository extends CoreBaseRepository<HrEntity> {
  constructor(tenants: ManagerCoreTenantDatasourceService, private readonly config: ManagerCoreConfigService, private readonly encryption: ManagerCoreEncryptionService) { super(tenants, HrEntity); }

  /** @description Finds a non-deleted hr record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findById(id: string): Promise<HrDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
    return row ? HrMapper.toDomain({ ...row, isDeleted: false, payload: this.revealSensitivePayload(row.payload) }) : null;
  }

  /** @description Finds a non-deleted hr record or fails fast. @param id - Record UUID. @returns Domain record. @throws ManagerCoreNotFoundException when absent. */
  async findByIdOrThrow(id: string): Promise<HrDomainData> {
    const row = await this.findById(id);
    if (!row) throw new ManagerCoreNotFoundException('hr', id);
    return row;
  }

  /** @description Creates a hr record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createStaff(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<HrDomainData> {
    const repository = await this.getRepository(context);
    const prepared = this.prepareMoneyPersistence(data);
    const row = repository.create({ payload: this.protectSensitivePayload(prepared.payload), currency: prepared.currency, salaryMinor: prepared.minors.salary, advanceSalaryMinor: prepared.minors.advanceSalary, currentDueMinor: prepared.minors.currentDue, amountMinor: prepared.minors.amount, paidAmountMinor: prepared.minors.paidAmount, pendingAmountMinor: prepared.minors.pendingAmount, advanceAmountMinor: prepared.minors.advanceAmount, netPayableMinor: prepared.minors.netPayable, isDeleted: false });
    const saved = await repository.save(row);
    saved.payload = this.revealSensitivePayload(saved.payload);
    return HrMapper.toDomain(saved);
  }

  /** @description Creates a payroll record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createPayroll(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<HrDomainData> {
    const repository = await this.getRepository(context);
    const prepared = this.prepareMoneyPersistence(data);
    const row = repository.create({ payload: this.protectSensitivePayload(prepared.payload), currency: prepared.currency, salaryMinor: prepared.minors.salary, advanceSalaryMinor: prepared.minors.advanceSalary, currentDueMinor: prepared.minors.currentDue, amountMinor: prepared.minors.amount, paidAmountMinor: prepared.minors.paidAmount, pendingAmountMinor: prepared.minors.pendingAmount, advanceAmountMinor: prepared.minors.advanceAmount, netPayableMinor: prepared.minors.netPayable, isDeleted: false });
    const saved = await repository.save(row);
    saved.payload = this.revealSensitivePayload(saved.payload);
    return HrMapper.toDomain(saved);
  }

  /** @description Updates a hr record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws ManagerCoreNotFoundException when absent. */
  async updateStaff(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<HrDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('hr', id);
    row.payload = this.protectSensitivePayload({ ...row.payload, ...data });
    const saved = await repository.save(row);
    saved.payload = this.revealSensitivePayload(saved.payload);
    return HrMapper.toDomain(saved);
  }

  /** @description Updates a payroll record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws ManagerCoreNotFoundException when absent. */
  async updatePayroll(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<HrDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('hr', id);
    row.payload = this.protectSensitivePayload({ ...row.payload, ...data });
    const saved = await repository.save(row);
    saved.payload = this.revealSensitivePayload(saved.payload);
    return HrMapper.toDomain(saved);
  }

  /** @description Updates payroll status with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws ManagerCoreNotFoundException when absent. */
  async updatePayrollStatus(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<HrDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('hr', id);
    row.payload = this.protectSensitivePayload({ ...row.payload, ...data });
    const saved = await repository.save(row);
    saved.payload = this.revealSensitivePayload(saved.payload);
    return HrMapper.toDomain(saved);
  }

  /** @description Generates one payroll record per eligible staff member for the requested month, skipping existing payrolls. @param month - Payroll month YYYY-MM. @param context - Transaction context. @returns Generated payroll records. */
  async generatePayrolls(month: string, context: ManagerCoreTransactionContext): Promise<HrDomainData[]> {
    const repository = await this.getRepository(context);
    const staffRows = await repository.createQueryBuilder('record').setLock('pessimistic_read').where("record.deleted_at IS NULL AND record.payload ->> 'recordType' = :recordType", { recordType: 'STAFF' }).getMany();
    const payrolls: HrDomainData[] = [];
    for (const staff of staffRows) {
      const existing = await repository.createQueryBuilder('record').where("record.deleted_at IS NULL AND record.payload ->> 'recordType' = :recordType AND record.payload ->> 'staffId' = :staffId AND record.payload ->> 'month' = :month", { recordType: 'PAYROLL', staffId: staff.id, month }).getOne();
      if (existing) continue;
      const salaryMinor = String(staff.salaryMinor ?? '0');
      const row = repository.create({ payload: this.protectSensitivePayload({ recordType: 'PAYROLL', staffId: staff.id, month, netPayable: Number(salaryMinor), paidAmount: 0, pendingAmount: Number(salaryMinor), status: 'PENDING', staff: staff.payload }), salaryMinor, netPayableMinor: salaryMinor, paidAmountMinor: '0', isDeleted: false, pendingAmountMinor: salaryMinor, currency: staff.currency });
      const saved = await repository.save(row);
      payrolls.push(HrMapper.toDomain({ ...saved, isDeleted: false, payload: this.revealSensitivePayload(saved.payload) }));
    }
    return payrolls;
  }

  /** @description Records a staff advance using a locked staff record. @param staffId - Staff UUID. @param amount - Integer minor units. @param payment - Payment metadata. @param context - Transaction context. @returns Updated staff domain record. */
  async giveStaffAdvance(staffId: string, amount: number, payment: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<HrDomainData> {
    const repository = await this.getRepository(context); const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :staffId AND record.deleted_at IS NULL', { staffId }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('hr', staffId); const next = (BigInt(row.advanceAmountMinor ?? '0') + BigInt(amount)).toString(); row.advanceAmountMinor = next; row.payload = this.protectSensitivePayload({ ...row.payload, lastLedgerEntry: { type: 'ADVANCE_GIVEN', amount, ...payment, createdAt: new Date().toISOString() } }); const saved = await repository.save(row); saved.payload = this.revealSensitivePayload(saved.payload); return HrMapper.toDomain(saved);
  }

  /** @description Pays staff due using a locked staff record. @param staffId - Staff UUID. @param amount - Integer minor units. @param payment - Payment metadata. @param context - Transaction context. @returns Updated staff domain record. */
  async payStaffDue(staffId: string, amount: number, payment: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<HrDomainData> {
    const repository = await this.getRepository(context); const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :staffId AND record.deleted_at IS NULL', { staffId }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('hr', staffId); const due = BigInt(row.currentDueMinor ?? '0'); const pay = BigInt(amount); if (pay > due) throw new ManagerCoreBusinessException('hr.ERRORS.DUE_EXCEEDS_BALANCE', 'HR.LEDGER.EXCEEDS_DUE', HttpStatus.CONFLICT); row.currentDueMinor = (due - pay).toString(); row.paidAmountMinor = (BigInt(row.paidAmountMinor ?? '0') + pay).toString(); row.payload = this.protectSensitivePayload({ ...row.payload, lastLedgerEntry: { type: 'DUE_PAID', amount, ...payment, createdAt: new Date().toISOString() } }); const saved = await repository.save(row); saved.payload = this.revealSensitivePayload(saved.payload); return HrMapper.toDomain(saved);
  }

  /** @description Soft-deletes a hr record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws ManagerCoreNotFoundException when absent. */
  async deleteStaff(id: string, context: ManagerCoreTransactionContext): Promise<HrDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('hr', id);
    row.deletedAt = new Date();
    const saved = await repository.save(row);
    saved.payload = this.revealSensitivePayload(saved.payload);
    return HrMapper.toDomain(saved);
  }

  /** @description Finds filtered and paginated hr records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findAll(query: ManagerCoreJsonObject): Promise<HrListResult> {
    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));
    const repository = await this.getRepository();
    const builder = repository.createQueryBuilder('record').where('record.deleted_at IS NULL');
    if (typeof query.search === 'string' && query.search.trim()) builder.andWhere("record.payload::text ILIKE :search", { search: '%' + query.search.trim().replace(/[%_]/g, '') + '%' });
    if (typeof query.status === 'string') builder.andWhere("record.payload ->> 'status' = :status", { status: query.status });
    if (typeof query.date === 'string') builder.andWhere("record.payload ->> 'date' = :date", { date: query.date });
    if (typeof query.staffId === 'string') builder.andWhere("record.payload ->> 'staffId' = :staffId", { staffId: query.staffId });
    if (typeof query.role === 'string') builder.andWhere("record.payload ->> 'role' = :role", { role: query.role });
    if (typeof query.month === 'string') builder.andWhere("record.payload ->> 'month' = :month", { month: query.month });
    const sortFields = HrAllowedSortFields;
    const sortKey = typeof query.sort === 'string' && sortFields.includes(query.sort as typeof sortFields[number]) ? query.sort : 'createdAt';
    const sortDir = String(query.dir ?? 'desc').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const column = sortKey === 'createdAt' ? 'record.created_at' : (sortKey as string) === 'updatedAt' ? 'record.updated_at' : 'record.id';
    builder.orderBy(column, sortDir); if (!query.__unbounded) builder.skip((page - 1) * limit).take(limit);
    const [rows,total] = await builder.getManyAndCount();
    rows.forEach((row: HrEntity) => { row.payload = this.revealSensitivePayload(row.payload); });
    return { data: rows.map((row: HrEntity) => HrMapper.toDomain(row)), meta: buildPaginationMeta(total,page,limit) };
  }
  /** @description Encrypts sensitive payload fields before persistence, including nested objects/arrays. @param payload - Feature payload. @returns Protected payload. */
  private protectSensitivePayload(payload: ManagerCoreJsonObject): ManagerCoreJsonObject {
    return this.mapSensitiveValue(payload, false) as ManagerCoreJsonObject;
  }

  /** @description Decrypts known sensitive payload fields after loading, including nested objects/arrays. @param payload - Persisted payload. @returns Decrypted payload. */
  private revealSensitivePayload(payload: ManagerCoreJsonObject): ManagerCoreJsonObject {
    return this.mapSensitiveValue(payload, true) as ManagerCoreJsonObject;
  }

  /** @description Recursively protects or reveals configured sensitive HR fields without mutating the original object. @param value - JSON value. @param reveal - Whether to decrypt protected strings. @returns Transformed JSON value. */
  private mapSensitiveValue(value: ManagerCoreJsonObject | ManagerCoreJsonValue | ManagerCoreJsonValue[], reveal: boolean): ManagerCoreJsonValue {
    if (Array.isArray(value)) return value.map((item) => this.mapSensitiveValue(item, reveal));
    if (value !== null && typeof value === 'object') {
      const output: ManagerCoreJsonObject = {};
      for (const [key, child] of Object.entries(value)) {
        if (['aadhaar', 'bankAccountNumber', 'medicalNotes'].includes(key) && typeof child === 'string') {
          if (!reveal && !child.startsWith('v1.')) output[key] = this.encryption.encrypt(child);
          else if (reveal && child.startsWith('v1.')) {
            try { output[key] = this.encryption.decrypt(child); } catch { output[key] = child; }
          } else output[key] = child;
          continue;
        }
        output[key] = this.mapSensitiveValue(child, reveal);
      }
      return output;
    }
    return value;
  }

  /** Converts API money fields from integer minor units into explicit database columns and removes them from JSONB. */
  private prepareMoneyPersistence(data: ManagerCoreJsonObject): { payload: ManagerCoreJsonObject; currency: string; minors: Record<string, string | null> } {
    const copy: ManagerCoreJsonObject = { ...data };
    const currency = typeof copy.currency === 'string' ? copy.currency : this.config.defaultCurrencyCode;
    delete copy.currency;
    const minors: Record<string, string | null> = {};
    if (copy.salary !== undefined) { const value = Number(copy.salary); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.salary = String(value); delete copy.salary; }
    else minors.salary = null;
    if (copy.advanceSalary !== undefined) { const value = Number(copy.advanceSalary); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.advanceSalary = String(value); delete copy.advanceSalary; }
    else minors.advanceSalary = null;
    if (copy.currentDue !== undefined) { const value = Number(copy.currentDue); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.currentDue = String(value); delete copy.currentDue; }
    else minors.currentDue = null;
    if (copy.amount !== undefined) { const value = Number(copy.amount); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.amount = String(value); delete copy.amount; }
    else minors.amount = null;
    if (copy.paidAmount !== undefined) { const value = Number(copy.paidAmount); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.paidAmount = String(value); delete copy.paidAmount; }
    else minors.paidAmount = null;
    if (copy.pendingAmount !== undefined) { const value = Number(copy.pendingAmount); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.pendingAmount = String(value); delete copy.pendingAmount; }
    else minors.pendingAmount = null;
    if (copy.advanceAmount !== undefined) { const value = Number(copy.advanceAmount); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.advanceAmount = String(value); delete copy.advanceAmount; }
    else minors.advanceAmount = null;
    if (copy.netPayable !== undefined) { const value = Number(copy.netPayable); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.netPayable = String(value); delete copy.netPayable; }
    else minors.netPayable = null;
    return { payload: copy, currency, minors };
  }

}

export { ManagerHrRepository as HrRepository };
