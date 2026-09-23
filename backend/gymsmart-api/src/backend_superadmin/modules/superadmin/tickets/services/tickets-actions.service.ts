// RESPONSIBILITY: Executes close, assignment, and reply mutations for support tickets.
// FLOW: Controller -> action service -> repository named mutation -> updated ticket.
import { Injectable } from '@nestjs/common';
import { TicketsRepository } from '@/backend_superadmin/modules/backend_superadmin/tickets/tickets.repository';
import { SupportTicketStatus } from '@/backend_superadmin/modules/backend_superadmin/tickets/tickets.entity';

@Injectable()
export class TicketsActionsService {
  constructor(private readonly repository: TicketsRepository) {}
  /** Closes a support ticket. */
  async close(id: string): Promise<unknown> { return this.repository.setStatus(id, SupportTicketStatus.CLOSED); }
  /** Assigns a support ticket to an authenticated/validated assignee identifier. */
  async assign(id: string, assignee: string): Promise<unknown> { return this.repository.assignById(id, assignee); }
  /** Persists a ticket reply as the latest response text. */
  async reply(id: string, replyText: string): Promise<unknown> { return this.repository.replyById(id, replyText); }
}