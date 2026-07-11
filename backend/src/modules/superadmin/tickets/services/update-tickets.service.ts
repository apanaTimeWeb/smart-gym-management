import { UpdateSupportTicketDto } from '../dto/update-tickets.dto';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { TicketsRepository } from '../tickets.repository';
import { TicketStatus } from '../tickets.interfaces';

@Injectable()
export class UpdateTicketsService {
  constructor(private readonly repository: TicketsRepository) {}
  
  async execute(id: string, dto: UpdateSupportTicketDto): Promise<any> {
    const ticket = await this.repository.findById(id);
    if (!ticket) throw new NotFoundException('Ticket not found');
    
    if (dto.status && dto.status !== ticket.status) {
      // Validate state transition
      const current = ticket.status;
      const next = dto.status;
      
      if (current === TicketStatus.RESOLVED && next === TicketStatus.OPEN) {
        throw new BadRequestException('Cannot change resolved ticket directly to OPEN. Use IN_PROGRESS first or reopen explicitly.');
      }
      
      // We can also strictly enforce: OPEN -> IN_PROGRESS -> RESOLVED
      if (current === TicketStatus.OPEN && next === TicketStatus.RESOLVED) {
         // This is fine, quick resolve
      }
    }
    
    // Automatically update lastUpdated timestamp (typeorm should do this with @UpdateDateColumn, but let's be safe)
    const payload = {
      ...dto,
      lastUpdated: new Date()
    };
    
    return await this.repository.update(id, payload);
  }
}
