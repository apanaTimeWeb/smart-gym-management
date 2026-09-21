// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the invoices feature; no business logic.
// FLOW: invoices service -> InvoicesRepository -> TypeORM Repository<SaasInvoiceEntity> -> PostgreSQL `saas_invoices`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { SaasInvoiceEntity } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/invoices.entity';
import type { InvoicesListQuery, InvoicesCreateInput, InvoicesUpdateInput } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/types/invoices.interfaces';

@Injectable()
export class InvoicesRepository extends BaseRepository<SaasInvoiceEntity> {
  constructor(@InjectRepository(SaasInvoiceEntity) repository: Repository<SaasInvoiceEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: InvoicesListQuery): Promise<{ items: SaasInvoiceEntity[]; total: number }> {
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
  async findById(id: string): Promise<SaasInvoiceEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<SaasInvoiceEntity> { return super.findByIdOrThrow(id, 'Invoices record not found'); }

  /** Creates and persists a invoices record. */
  async createInvoices(input: InvoicesCreateInput): Promise<SaasInvoiceEntity> { const entity = this.activeRepository.create(input as never); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a invoices record. */
  async updateInvoicesById(id: string, input: InvoicesUpdateInput): Promise<SaasInvoiceEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one invoices record. */
  async deleteInvoicesById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

  /** Marks an invoice as paid inside the repository boundary. */
  async createManualPaymentInvoice(input: { tenantId: string; tenantName: string; amount: number; currency: string; planName: string }): Promise<SaasInvoiceEntity> { const now = new Date(); const invoice = this.activeRepository.create({ tenantId: input.tenantId, tenantName: input.tenantName, amount: input.amount, currency: input.currency, status: 'PAID', issuedAt: now, dueDate: now, paidAt: now, paymentMethod: 'Bank Transfer', invoiceType: 'ONE_TIME', planName: input.planName, taxId: '' } as never); return this.activeRepository.save(invoice); }

  

}
