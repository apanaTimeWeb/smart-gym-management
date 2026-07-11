import { CreateSupportTicketDto } from '../dto/create-tickets.dto';
import { Injectable } from '@nestjs/common';
import { TicketsRepository } from '../tickets.repository';

@Injectable()
export class CreateTicketsService {
  constructor(private readonly repository: TicketsRepository) {}
  
  async execute(dto: CreateSupportTicketDto): Promise<any> {
    return await this.repository.create(dto);
  }
}
