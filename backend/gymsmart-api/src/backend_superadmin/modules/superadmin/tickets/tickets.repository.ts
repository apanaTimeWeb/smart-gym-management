// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the tickets feature; no business logic.
// FLOW: tickets service -> TicketsRepository -> TypeORM Repository<TicketsEntity> -> PostgreSQL `support_tickets`.
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportTicketPriority } from '@/backend_superadmin/modules/backend_superadmin/tickets/tickets.entity';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { randomUUID } from 'node:crypto';
import { TicketsEntity, SupportTicketStatus } from '@/backend_superadmin/modules/backend_superadmin/tickets/tickets.entity';
import type { TicketsListQuery, TicketsCreateInput, TicketsUpdateInput } from '@/backend_superadmin/modules/backend_superadmin/tickets/types/tickets.interfaces';


@Injectable()
export class TicketsRepository extends BaseRepository<TicketsEntity> {
  constructor(@InjectRepository(TicketsEntity) repository: Repository<TicketsEntity>, transactionContext: TransactionContext) { super(repository, transactionContext, true); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: TicketsListQuery): Promise<{ items: TicketsEntity[]; total: number }> {
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
  async findById(id: string): Promise<TicketsEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<TicketsEntity> { return super.findByIdOrThrow(id, 'Tickets record not found'); }

  /** Creates and persists a tickets record. */
  async createTickets(input: TicketsCreateInput): Promise<TicketsEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a tickets record. */
  async updateTicketsById(id: string, input: TicketsUpdateInput): Promise<TicketsEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one tickets record. */
  async deleteTicketsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

  /** Changes the ticket status through an intention-revealing repository method. */
  async setStatus(id: string, status: SupportTicketStatus): Promise<TicketsEntity> { await this.findByIdOrThrow(id); await this.activeRepository.update({ id } as never, { status } as never); return this.findByIdOrThrow(id); }


  /** Returns persisted ticket telemetry projected into the service-insights contract. */
  async getServiceInsights(): Promise<{ summary: { open: number; urgent: number; nearTarget: number; overTarget: number; averageFirstResponseMinutes: number; averageResolutionHours: number; satisfaction: number }; agents: Array<{ name: string; open: number; urgent: number; overTarget: number; averageHours: number }>; aging: Array<{ bucket: string; count: number }>; categories: Array<{ name: string; count: number }> }> {
    const rows = await this.activeRepository.find({ where: { deletedAt: null } as never, order: { updatedAt: 'DESC' } as never });
    const now = Date.now();
    const openRows = rows.filter((row) => [SupportTicketStatus.OPEN, SupportTicketStatus.INPROGRESS, SupportTicketStatus.WAITING].includes(row.status));
    const urgentRows = rows.filter((row) => [SupportTicketPriority.URGENT, SupportTicketPriority.CRITICAL].includes(row.priority));
    const responseDurations = rows.filter((row) => row.firstResponseAt).map((row) => Math.max(0, (row.firstResponseAt!.getTime() - row.createdAt.getTime()) / 60_000));
    const resolutionHours = rows.filter((row) => row.resolutionTime > 0).map((row) => row.resolutionTime / 60_000);
    const agentMap = new Map<string, { open: number; urgent: number; overTarget: number; hours: number[] }>();
    for (const row of rows) {
      const name = row.assignedTo ?? 'Unassigned';
      const current = agentMap.get(name) ?? { open: 0, urgent: 0, overTarget: 0, hours: [] };
      if (openRows.includes(row)) current.open += 1;
      if ([SupportTicketPriority.URGENT, SupportTicketPriority.CRITICAL].includes(row.priority)) current.urgent += 1;
      if (row.slaDeadline && row.slaDeadline.getTime() < now && openRows.includes(row)) current.overTarget += 1;
      if (row.resolutionTime > 0) current.hours.push(row.resolutionTime / 3_600_000);
      agentMap.set(name, current);
    }
    const agents = [...agentMap.entries()].map(([name, value]) => ({ name, open: value.open, urgent: value.urgent, overTarget: value.overTarget, averageHours: value.hours.length ? Number((value.hours.reduce((a, b) => a + b, 0) / value.hours.length).toFixed(2)) : 0 }));
    const aging = [
      { bucket: '0-1 day', count: openRows.filter((row) => now - row.createdAt.getTime() < 86_400_000).length },
      { bucket: '2-3 days', count: openRows.filter((row) => now - row.createdAt.getTime() >= 86_400_000 && now - row.createdAt.getTime() < 3 * 86_400_000).length },
      { bucket: '4-7 days', count: openRows.filter((row) => now - row.createdAt.getTime() >= 3 * 86_400_000 && now - row.createdAt.getTime() < 7 * 86_400_000).length },
      { bucket: '8+ days', count: openRows.filter((row) => now - row.createdAt.getTime() >= 7 * 86_400_000).length },
    ];
    const categories = [{ name: 'Billing', count: rows.filter((row) => /bill|invoice|payment/i.test(row.subject + ' ' + row.description)).length }, { name: 'Technical', count: rows.filter((row) => /bug|error|login|api|technical/i.test(row.subject + ' ' + row.description)).length }, { name: 'Feature request', count: rows.filter((row) => /feature|request/i.test(row.subject + ' ' + row.description)).length }, { name: 'Account', count: rows.filter((row) => /account|access|profile/i.test(row.subject + ' ' + row.description)).length }];
    return { summary: { open: openRows.length, urgent: urgentRows.length, nearTarget: openRows.filter((row) => row.slaDeadline && row.slaDeadline.getTime() >= now && row.slaDeadline.getTime() - now <= 3_600_000).length, overTarget: openRows.filter((row) => row.slaDeadline && row.slaDeadline.getTime() < now).length, averageFirstResponseMinutes: responseDurations.length ? Number((responseDurations.reduce((a, b) => a + b, 0) / responseDurations.length).toFixed(2)) : 0, averageResolutionHours: resolutionHours.length ? Number((resolutionHours.reduce((a, b) => a + b, 0) / resolutionHours.length).toFixed(2)) : 0, satisfaction: 0 }, agents, aging, categories };
  }

  /** Stores an assignment target on the ticket. */
  async assignById(id: string, assignee: string): Promise<TicketsEntity> { if (!assignee.trim()) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'TICKETS.ASSIGNEE.REQUIRED', message: { key: 'tickets.ERRORS.BAD_REQUEST' } }); await this.findByIdOrThrow(id); await this.activeRepository.update({ id } as never, { assignedTo: assignee } as never); return this.findByIdOrThrow(id); }

  /** Stores the latest reply content as an immutable message entry. */
  async replyById(id: string, replyText: string): Promise<TicketsEntity> {
    if (!replyText.trim()) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'TICKETS.REPLY.REQUIRED', message: { key: 'tickets.ERRORS.BAD_REQUEST' } });
    const current = await this.findByIdOrThrow(id);
    const messages = Array.isArray(current.messages) ? current.messages : [];
    await this.activeRepository.update({ id } as never, { messages: [...messages, { id: randomUUID(), body: replyText.trim(), createdAt: new Date().toISOString() }] } as never);
    return this.findByIdOrThrow(id);
  }

}