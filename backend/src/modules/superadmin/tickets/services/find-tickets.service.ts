import { Injectable } from '@nestjs/common';
import { TicketsRepository } from '../tickets.repository';

@Injectable()
export class FindTicketsService {
  constructor(private readonly repository: TicketsRepository) {}
  
  async execute(): Promise<any[]> {
    return await this.repository.findAll();
  }
  async findOne(id: string): Promise<any> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new Error('SupportTicket not found');
    return entity;
  }
}
