import { CreateSupportTicketDto } from '../dto/create-tickets.dto';
import { Injectable } from '@nestjs/common';
import { TicketsRepository } from '../tickets.repository';
import { TicketResponse } from '../tickets.interfaces';
import { TICKETS_MESSAGES } from '../tickets.constants';

@Injectable()
export class CreateTicketsService {
  constructor(private readonly repository: TicketsRepository) {}
  
  async execute(dto: CreateSupportTicketDto): Promise<TicketResponse> {
    const data = await this.repository.create(dto);
    return {
      success: true,
      message: TICKETS_MESSAGES.CREATED,
      data
    };
  }
}
