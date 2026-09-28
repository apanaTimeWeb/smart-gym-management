// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { ManagerCoreConfigService } from '@/backend_manager/manager_core/manager_core_config/manager-core-config.service';
import { CoreBaseRepository } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.repository';
import { ManagerCoreTenantDatasourceService } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-datasource.service';
import { ManagerCoreNotFoundException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-not-found.exception';
import { ManagerCoreBusinessException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-business.exception';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { ManagerCoreEncryptionService } from '@/backend_manager/manager_core/manager_core_security/manager-core-encryption.service';
import { buildPaginationMeta } from '@/backend_manager/manager_core/manager_core_utils/manager-core-pagination.utils';

import { MembersMapper } from '@/backend_manager/manager_modules/members/manager-members.mapper';
import { MembersEntity } from '@/backend_manager/manager_modules/members/manager-members.entity';
import { ManagerMembersPaymentStatus } from '@/backend_manager/manager_modules/members/manager-members.constants';

import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerMembersDomainData, ManagerMembersListResult, ManagerMembersPaymentSnapshot } from '@/backend_manager/manager_modules/members/members_types/manager-members.types';

@Injectable()
export class ManagerMembersRepository extends CoreBaseRepository<MembersEntity> {
  constructor(tenants: ManagerCoreTenantDatasourceService, private readonly config: ManagerCoreConfigService, private readonly encryption: ManagerCoreEncryptionService) { super(tenants, MembersEntity); }

  /** @description Finds a non-deleted members record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findById(id: string): Promise<ManagerMembersDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
    return row ? MembersMapper.toDomain({ ...row, isDeleted: false, payload: this.revealSensitivePayload(row.payload) }) : null;
  }

  /** @description Finds a non-deleted members record or fails fast. @param id - Record UUID. @returns Domain record. @throws ManagerCoreNotFoundException when absent. */
  async findByIdOrThrow(id: string): Promise<ManagerMembersDomainData> {
    const row = await this.findById(id);
    if (!row) throw new ManagerCoreNotFoundException('members', id);
    return row;
  }

  /** @description Creates a members record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createMember(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerMembersDomainData> {
    const repository = await this.getRepository(context);
    const prepared = this.prepareMoneyPersistence(data);
    const row = repository.create({ payload: this.protectSensitivePayload(prepared.payload), currency: prepared.currency, totalAmountMinor: prepared.minors.totalAmount, paidAmountMinor: prepared.minors.paidAmount, pendingAmountMinor: prepared.minors.pendingAmount, advanceAmountMinor: prepared.minors.advanceAmount, amountPaidMinor: prepared.minors.amountPaid, isDeleted: false });
    const saved = await repository.save(row);
    saved.payload = this.revealSensitivePayload(saved.payload);
    return MembersMapper.toDomain(saved);
  }

  /** @description Updates a members record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws ManagerCoreNotFoundException when absent. */
  async updateById(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerMembersDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('members', id);
    row.payload = this.protectSensitivePayload({ ...row.payload, ...data });
    const saved = await repository.save(row);
    saved.payload = this.revealSensitivePayload(saved.payload);
    return MembersMapper.toDomain(saved);
  }

  /** @description Soft-deletes a members record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws ManagerCoreNotFoundException when absent. */
  async softDelete(id: string, context: ManagerCoreTransactionContext): Promise<ManagerMembersDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('members', id);
    row.deletedAt = new Date();
    const saved = await repository.save(row);
    saved.payload = this.revealSensitivePayload(saved.payload);
    return MembersMapper.toDomain(saved);
  }


  /** Adds one validated payment snapshot to the member ledger under a pessimistic write lock. */
  async createMemberPayment(id: string, payment: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerMembersPaymentSnapshot> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('members', id);
    const payments = Array.isArray(row.payload.recentPayments) ? row.payload.recentPayments : [];
    const invoiceNumber = typeof payment.invoiceNumber === 'string' ? payment.invoiceNumber : `MEM-${id.slice(0, 8)}-${payments.length + 1}`;
    const snapshot: ManagerCoreJsonObject = { id: randomUUID(), amount: Number(payment.amount ?? 0), currency: String(payment.currency ?? row.currency), paidAt: String(payment.paidAt ?? new Date().toISOString()), method: String(payment.method ?? ''), status: String(payment.status ?? ''), invoiceNumber };
    const paidMinor = BigInt(row.paidAmountMinor ?? '0');
    const pendingMinor = BigInt(row.pendingAmountMinor ?? '0');
    const amountMinor = BigInt(String(payment.amount ?? '0'));
    if (amountMinor < 0n) throw new ManagerCoreContextException('Payment amount cannot be negative.', 'MEMBERS.PAYMENT.AMOUNT_INVALID');
    if (invoiceNumber && payments.some((item) => typeof item === 'object' && item !== null && String((item as Record<string, unknown>).invoiceNumber ?? '') === invoiceNumber)) throw new ManagerCoreContextException('Invoice number is already recorded for this member.', 'MEMBERS.PAYMENT.DUPLICATE_INVOICE');
    row.payload = { ...row.payload, recentPayments: [...payments, snapshot] };
    if (snapshot.status === ManagerMembersPaymentStatus.PAID.toString()) { row.paidAmountMinor = (paidMinor + amountMinor).toString(); row.pendingAmountMinor = pendingMinor > amountMinor ? (pendingMinor - amountMinor).toString() : '0'; }
    await repository.save(row);
    return snapshot;
  }
  /** @description Assigns a diet plan to an existing member under a pessimistic lock. @param memberId - Member UUID. @param dietPlanId - Diet plan UUID. @param context - Active transaction context. @returns Updated member domain record. */
  async assignDietPlan(memberId: string, dietPlanId: string, context: ManagerCoreTransactionContext): Promise<ManagerMembersDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :memberId AND record.deleted_at IS NULL', { memberId }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('members', memberId);
    row.payload = { ...row.payload, dietPlanId, dietPlanAssignedAt: new Date().toISOString() };
    const saved = await repository.save(row);
    saved.payload = this.revealSensitivePayload(saved.payload);
    return MembersMapper.toDomain(saved);
  }

  /** @description Assigns a workout to an existing member under a pessimistic lock. @param memberId - Member UUID. @param workoutId - Workout UUID. @param context - Active transaction context. @returns Updated member domain record. */
  async assignWorkout(memberId: string, workoutId: string, context: ManagerCoreTransactionContext): Promise<ManagerMembersDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :memberId AND record.deleted_at IS NULL', { memberId }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('members', memberId);
    row.payload = { ...row.payload, workoutId, workoutAssignedAt: new Date().toISOString() };
    const saved = await repository.save(row);
    saved.payload = this.revealSensitivePayload(saved.payload);
    return MembersMapper.toDomain(saved);
  }

  /** @description Finds filtered  and paginated members records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findAll(query: ManagerCoreJsonObject): Promise<ManagerMembersListResult> {
    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));
    const repository = await this.getRepository();
    const builder = repository.createQueryBuilder('record').where('record.deleted_at IS NULL');
    if (typeof query.memberId === 'string') builder.andWhere('record.id = :memberId', { memberId: query.memberId });
    if (typeof query.search === 'string' && query.search.trim()) builder.andWhere("record.payload::text ILIKE :search", { search: '%' + query.search.trim().replace(/[%_]/g, '') + '%' });
    if (typeof query.status === 'string') builder.andWhere("record.payload ->> 'status' = :status", { status: query.status });
    if (typeof query.date === 'string') builder.andWhere("record.payload ->> 'date' = :date", { date: query.date });
    if (typeof query.gender === 'string') builder.andWhere("record.payload ->> 'gender' = :gender", { gender: query.gender });
    if (typeof query.plan === 'string') builder.andWhere("record.payload ->> 'plan' = :plan", { plan: query.plan });
    if (typeof query.expiryFrom === 'string') builder.andWhere("record.payload ->> 'expiryDate' >= :expiryFrom", { expiryFrom: query.expiryFrom });
    if (typeof query.expiryTo === 'string') builder.andWhere("record.payload ->> 'expiryDate' <= :expiryTo", { expiryTo: query.expiryTo });
    const sortFields = ['name','joinDate','expiryDate','paidAmount','status','createdAt','updatedAt','id'] as const;
    const sortKey = typeof query.sort === 'string' && sortFields.includes(query.sort as typeof sortFields[number]) ? query.sort : 'name';
    const sortDir = String(query.dir ?? 'asc').toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const column = sortKey === 'createdAt' ? 'record.created_at' : (sortKey as string) === 'updatedAt' ? 'record.updated_at' : sortKey === 'id' ? 'record.id' : `record.payload ->> '${sortKey}'`;
    builder.orderBy(column, sortDir); if (!query.__unbounded) builder.skip((page - 1) * limit).take(limit);
    const [rows,total] = await builder.getManyAndCount();
    rows.forEach((row: MembersEntity) => { row.payload = this.revealSensitivePayload(row.payload); });
    return { data: rows.map((row: MembersEntity) => MembersMapper.toDomain(row)), meta: buildPaginationMeta(total,page,limit) };
  }
  /** @description Encrypts sensitive payload fields before persistence. @param payload - Feature payload. @returns Protected payload. */
  private protectSensitivePayload(payload: ManagerCoreJsonObject): ManagerCoreJsonObject {
    const copy: ManagerCoreJsonObject = { ...payload };
    for (const key of ['aadhaar', 'medicalHistory'] as const) { if (typeof copy[key] === 'string' && !copy[key].startsWith('v1.')) copy[key] = this.encryption.encrypt(copy[key] as string); }
    return copy;
  }

  /** @description Decrypts known sensitive payload fields after loading. @param payload - Persisted payload. @returns Decrypted payload. */
  private revealSensitivePayload(payload: ManagerCoreJsonObject): ManagerCoreJsonObject {
    const copy: ManagerCoreJsonObject = { ...payload };
    for (const key of ['aadhaar', 'medicalHistory'] as const) { if (typeof copy[key] === 'string' && (copy[key] as string).startsWith('v1.')) { try { copy[key] = this.encryption.decrypt(copy[key] as string); } catch { /* legacy/plain value */ } } }
    return copy;
  }

  /** Converts API money fields from integer minor units into explicit database columns and removes them from JSONB. */
  private prepareMoneyPersistence(data: ManagerCoreJsonObject): { payload: ManagerCoreJsonObject; currency: string; minors: Record<string, string | null> } {
    const copy: ManagerCoreJsonObject = { ...data };
    const currency = typeof copy.currency === 'string' ? copy.currency : this.config.defaultCurrencyCode;
    delete copy.currency;
    const minors: Record<string, string | null> = {};
    if (copy.totalAmount !== undefined) { const value = Number(copy.totalAmount); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.totalAmount = String(value); delete copy.totalAmount; }
    else minors.totalAmount = null;
    if (copy.paidAmount !== undefined) { const value = Number(copy.paidAmount); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.paidAmount = String(value); delete copy.paidAmount; }
    else minors.paidAmount = null;
    if (copy.pendingAmount !== undefined) { const value = Number(copy.pendingAmount); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.pendingAmount = String(value); delete copy.pendingAmount; }
    else minors.pendingAmount = null;
    if (copy.advanceAmount !== undefined) { const value = Number(copy.advanceAmount); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.advanceAmount = String(value); delete copy.advanceAmount; }
    else minors.advanceAmount = null;
    if (copy.amountPaid !== undefined) { const value = Number(copy.amountPaid); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.amountPaid = String(value); delete copy.amountPaid; }
    else minors.amountPaid = null;
    return { payload: copy, currency, minors };
  }

}

export { ManagerMembersRepository as MembersRepository };
