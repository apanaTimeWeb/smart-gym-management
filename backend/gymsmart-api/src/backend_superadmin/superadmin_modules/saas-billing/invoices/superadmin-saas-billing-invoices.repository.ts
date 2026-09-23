// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the invoices feature; no business logic.
// FLOW: invoices service -> SuperadminInvoicesRepository -> TypeORM Repository<SuperadminInvoicesEntity> -> PostgreSQL `saas_invoices`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaasInvoiceStatus } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.entity';
import { BaseRepository } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.repository';
import { SuperadminTransactionContext } from '@/backend_superadmin/superadmin_core/database/superadmin-core-transaction-context';
import { SuperadminInvoicesEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.entity';
import type { SuperadminInvoicesListQuery, SuperadminInvoicesCreateInput, SuperadminInvoicesUpdateInput } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/types/superadmin-saas-billing-invoices.interfaces';

@Injectable()
export class SuperadminInvoicesRepository extends BaseRepository<SuperadminInvoicesEntity> {
  constructor(@InjectRepository(SuperadminInvoicesEntity) repository: Repository<SuperadminInvoicesEntity>, transactionContext: SuperadminTransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: SuperadminInvoicesListQuery): Promise<{ items: SuperadminInvoicesEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.tenant_id ILIKE :search OR item.tenant_name ILIKE :search OR item.currency ILIKE :search OR item.plan_name ILIKE :search', { search: `%${search}%` });
    if (query.status) qb.andWhere('item.status = :status', { status: query.status });
    if (query.tenantId) qb.andWhere('item.tenant_id = :tenantId', { tenantId: query.tenantId });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'tenantId': 'item.tenant_id', 'tenantName': 'item.tenant_name', 'currency': 'item.currency', 'planName': 'item.plan_name', 'taxId': 'item.tax_id'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<SuperadminInvoicesEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<SuperadminInvoicesEntity> { return super.findByIdOrThrow(id, 'Invoices record not found'); }

  /** Creates and persists a invoices record. */
  async createInvoices(input: SuperadminInvoicesCreateInput): Promise<SuperadminInvoicesEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a invoices record. */
  async updateInvoicesById(id: string, input: SuperadminInvoicesUpdateInput): Promise<SuperadminInvoicesEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one invoices record. */
  async deleteInvoicesById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }


  /** Returns recovery telemetry derived from persisted invoice status and due dates. */
  async getRecoveryCenter(_query: Record<string, unknown> = {}): Promise<{ summary: { failed: number; inRecovery: number; recoveredIncome: number; unrecoveredIncome: number; currency: string }; recovery: Array<{ gym: string; invoice: string; amount: number; currency: string; attempts: number; nextRetry: string; daysLate: number; reason: string }>; reconciliation: Array<{ type: string; gym: string; amount: number; currency: string; status: string }>; policy: { firstRetry: string; secondRetry: string; finalRetry: string; gracePeriod: string; autoSuspend: string }; currency: string }> {
    const rows = await this.activeRepository.find({ where: { deletedAt: null } as never, order: { dueDate: 'ASC' } as never });
    const now = Date.now();
    const failed = rows.filter((row) => row.status === SaasInvoiceStatus.FAILED).length;
    const recoveryRows = rows.filter((row) => [SaasInvoiceStatus.FAILED, SaasInvoiceStatus.OVERDUE].includes(row.status));
    const recoveredIncome = rows.filter((row) => row.status === SaasInvoiceStatus.PAID && row.paidAt && now - row.paidAt.getTime() <= 30 * 86_400_000).reduce((sum, row) => sum + row.amount, 0);
    const unrecoveredIncome = recoveryRows.reduce((sum, row) => sum + row.amount, 0);
    const currency = rows[0]?.currency ?? 'INR';
    const recovery = recoveryRows.slice(0, 100).map((row) => ({ gym: row.tenantName, invoice: row.id, amount: row.amount, attempts: row.status === SaasInvoiceStatus.FAILED ? 1 : 0, nextRetry: new Date(Math.max(now, row.dueDate.getTime())).toISOString(), daysLate: Math.max(0, Math.floor((now - row.dueDate.getTime()) / 86_400_000)), reason: row.status === SaasInvoiceStatus.FAILED ? 'PAYMENT_FAILED' : 'OVERDUE' }));
    return { summary: { failed, inRecovery: recoveryRows.length, recoveredIncome, unrecoveredIncome, currency }, recovery: recovery.map((row) => ({ ...row, currency })), reconciliation: [], policy: { firstRetry: 'Day 0', secondRetry: 'Day 2', finalRetry: 'Day 5', gracePeriod: '7 days', autoSuspend: 'Day 10' }, currency };
  }

  /** Marks an invoice as paid inside the repository boundary. */
  async createManualPaymentInvoice(input: { tenantId: string; tenantName: string; amount: number; currency: string; planName: string }): Promise<SuperadminInvoicesEntity> { const now = new Date(); const invoice = this.activeRepository.create({ tenantId: input.tenantId, tenantName: input.tenantName, amount: input.amount, currency: input.currency, status: 'PAID', issuedAt: now, dueDate: now, paidAt: now, paymentMethod: 'Bank Transfer', invoiceType: 'ONE_TIME', planName: input.planName, taxId: '' } as any); return this.activeRepository.save(invoice as any); }

  

}