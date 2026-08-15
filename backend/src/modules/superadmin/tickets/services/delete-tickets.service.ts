import { Injectable } from '@nestjs/common';
import { TicketsRepository } from '../tickets.repository';
import { TicketResponse } from '../tickets.interfaces';
import { TICKETS_MESSAGES } from '../tickets.constants';

@Injectable()
export class DeleteTicketsService {
  constructor(private readonly repository: TicketsRepository) {}
  
  async execute(id: string): Promise<TicketResponse> {
    await this.repository.softDelete(id);
    return {
      success: true,
      message: TICKETS_MESSAGES.DELETED,
      data: null
    };
  }
}
