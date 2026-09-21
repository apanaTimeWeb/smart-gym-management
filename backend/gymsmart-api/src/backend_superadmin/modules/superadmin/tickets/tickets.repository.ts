// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the tickets feature; no business logic.
// FLOW: tickets service -> TicketsRepository -> TypeORM Repository<SupportTicketEntity> -> PostgreSQL `support_tickets`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { randomUUID } from 'node:crypto';

import { SupportTicketEntity, SupportTicketStatus } from '@/backend_superadmin/modules/superadmin/tickets/tickets.entity';
import type { TicketsListQuery, TicketsCreateInput, TicketsUpdateInput } from '@/backend_superadmin/modules/superadmin/tickets/types/tickets.interfaces';

@Injectable()
export class TicketsRepository extends BaseRepository<SupportTicketEntity> {
  constructor(@InjectRepository(SupportTicketEntity) repository: Repository<SupportTicketEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: TicketsListQuery): Promise<{ items: SupportTicketEntity[]; total: number }> {
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

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<SupportTicketEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<SupportTicketEntity> { return super.findByIdOrThrow(id, 'Tickets record not found'); }

  /** Creates and persists a tickets record. */
  async createTickets(input: TicketsCreateInput): Promise<SupportTicketEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity as any) as any; }

  /** Applies an intention-revealing update to a tickets record. */
  async updateTicketsById(id: string, input: TicketsUpdateInput): Promise<SupportTicketEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one tickets record. */
  async deleteTicketsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

  /** Changes the ticket status through an intention-revealing repository method. */
  async setStatus(id: string, status: SupportTicketStatus): Promise<SupportTicketEntity> { await this.findByIdOrThrow(id); await this.activeRepository.update({ id } as never, { status } as never); return this.findByIdOrThrow(id); }

  /** Stores an assignment target on the ticket. */
  async assignById(id: string, assignee: string): Promise<SupportTicketEntity> { if (!assignee.trim()) throw new Error('Assignee is required'); await this.findByIdOrThrow(id); await this.activeRepository.update({ id } as never, { assignedTo: assignee } as never); return this.findByIdOrThrow(id); }

  /** Stores the latest reply content as an immutable message entry. */
  async replyById(id: string, replyText: string): Promise<SupportTicketEntity> {
    if (!replyText.trim()) throw new Error('Reply text is required');
    const current = await this.findByIdOrThrow(id);
    const messages = Array.isArray(current.messages) ? current.messages : [];
    await this.activeRepository.update({ id } as never, { messages: [...messages, { id: randomUUID(), body: replyText.trim(), createdAt: new Date().toISOString() }] } as never);
    return this.findByIdOrThrow(id);
  }

}
