// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the tickets feature; no business logic.
// FLOW: tickets service -> SuperadminTicketsRepository -> TypeORM Repository<SuperadminTicketsEntity> -> PostgreSQL `support_tickets`.
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportTicketPriority } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.constants';
import { SuperadminCoreBaseRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.repository';
import { SuperadminCoreTransactionContext } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-transaction-context';
import { randomUUID } from 'node:crypto';
import { SuperadminTicketsEntity } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.entity';
import { SupportTicketStatus } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.constants';
import type { SuperadminTicketsListQuery, SuperadminTicketsCreateInput, SuperadminTicketsUpdateInput, SuperadminTicketsServiceInsightsRow } from '@/backend_superadmin/superadmin_modules/tickets/tickets_types/superadmin-tickets.interfaces';

/**
 * Primary Intent: Defines SuperadminTicketsRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminTicketsRepository extends SuperadminCoreBaseRepository<SuperadminTicketsEntity> {
  constructor(@InjectRepository(SuperadminTicketsEntity) repository: Repository<SuperadminTicketsEntity>, transactionContext: SuperadminCoreTransactionContext) { super(repository, transactionContext); }

  /**
 * Primary Intent: Executes the findPage use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findPage(query: SuperadminTicketsListQuery): Promise<{ items: SuperadminTicketsEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.subject ILIKE :search', { search: `%${search}%` });
    if (query.status) qb.andWhere('item.status = :status', { status: query.status });
    if (query.tenantId) qb.andWhere('item.tenant_id = :tenantId', { tenantId: query.tenantId });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'tenantId': 'item.tenant_id', 'tenantName': 'item.tenant_name', 'reporterEmail': 'item.reporter_email', 'subject': 'item.subject', 'description': 'item.description'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /**
 * Primary Intent: Executes the findById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findById(id: string): Promise<SuperadminTicketsEntity | null> { return super.findById(id); }

  /**
 * Primary Intent: Executes the findByIdOrThrow use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findByIdOrThrow(id: string): Promise<SuperadminTicketsEntity> { return super.findByIdOrThrow(id, 'Tickets record not found'); }

  /**
 * Primary Intent: Executes the createTickets use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createTickets(input: SuperadminTicketsCreateInput): Promise<SuperadminTicketsEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /**
 * Primary Intent: Executes the updateTicketsById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateTicketsById(id: string, input: SuperadminTicketsUpdateInput): Promise<SuperadminTicketsEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /**
 * Primary Intent: Executes the deleteTicketsById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async deleteTicketsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

  /**
 * Primary Intent: Executes the setStatus use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async setStatus(id: string, status: SupportTicketStatus): Promise<SuperadminTicketsEntity> { await this.findByIdOrThrow(id); await this.activeRepository.update({ id } as never, { status } as never); return this.findByIdOrThrow(id); }

  /** Returns all active tickets required by the service-insights computation. */
  /**
 * Primary Intent: Executes the findAllForServiceInsights use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findAllForServiceInsights(): Promise<SuperadminTicketsServiceInsightsRow[]> { const rows=await this.activeRepository.find({ where: { deletedAt: null } as never, order: { updatedAt: 'DESC' } as never }); return rows.map((row)=>({id:row.id,createdAt:row.createdAt,status:row.status,priority:row.priority,assignedTo:row.assignedTo,slaDeadline:row.slaDeadline,firstResponseAt:row.firstResponseAt,resolutionTime:row.resolutionTime,satisfactionScore:row.satisfactionScore,subject:row.subject,description:row.description})); }

  /**
 * Primary Intent: Executes the assignById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async assignById(id: string, assignee: string): Promise<SuperadminTicketsEntity> { if (!assignee.trim()) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'TICKETS.ASSIGNEE.REQUIRED', message: { key: 'tickets.ERRORS.BAD_REQUEST' } }); await this.findByIdOrThrow(id); await this.activeRepository.update({ id } as never, { assignedTo: assignee } as never); return this.findByIdOrThrow(id); }

  /**
 * Primary Intent: Executes the replyById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async replyById(id: string, replyText: string): Promise<SuperadminTicketsEntity> {
    if (!replyText.trim()) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'TICKETS.REPLY.REQUIRED', message: { key: 'tickets.ERRORS.BAD_REQUEST' } });
    const current = await this.findByIdOrThrow(id);
    const messages = Array.isArray(current.messages) ? current.messages : [];
    await this.activeRepository.update({ id } as never, { messages: [...messages, { id: randomUUID(), body: replyText.trim(), createdAt: new Date().toISOString() }] } as never);
    return this.findByIdOrThrow(id);
  }

}
