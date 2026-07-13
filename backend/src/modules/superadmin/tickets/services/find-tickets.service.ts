import { Injectable } from '@nestjs/common';
import { TicketsRepository } from '../tickets.repository';
import { TicketResponse } from '../tickets.interfaces';
import { TICKETS_MESSAGES, TICKETS_ERRORS } from '../tickets.constants';

@Injectable()
export class FindTicketsService {
  constructor(private readonly repository: TicketsRepository) {}
  
  async execute(): Promise<TicketResponse> {
    const data = await this.repository.findAll();
    return {
      success: true,
      message: TICKETS_MESSAGES.FETCHED,
      data
    };
  }
  async findOne(id: string): Promise<TicketResponse> {
    const data = await this.repository.findById(id);
    if (!data) throw new Error(TICKETS_ERRORS.NOT_FOUND);
    return {
      success: true,
      message: TICKETS_MESSAGES.FETCHED,
      data
    };
  }
}
