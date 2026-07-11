import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DUMMY_SUPPORT_TICKETS } from '../../superadmin.constants';
import { CreateTicketDto } from '../dto/create-tickets.dto';
import { UpdateTicketDto } from '../dto/update-tickets.dto';

@Injectable()
export class TicketsService {
  private readonly logger = new Logger(TicketsService.name);

  create(createDto: CreateTicketDto) {
    this.logger.log(`Creating new support ticket for: ${createDto.tenantName}`);
    return {
      success: true,
      message: 'Support ticket created successfully',
      data: {
        id: `TKT-${Date.now()}`,
        ...createDto,
        status: createDto.status ?? 'OPEN',
        priority: createDto.priority ?? 'MEDIUM',
        lastUpdated: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
    };
  }

  findAll() {
    this.logger.log('Fetching all support tickets');
    return {
      success: true,
      message: 'Support tickets fetched successfully',
      data: DUMMY_SUPPORT_TICKETS,
      meta: { total: DUMMY_SUPPORT_TICKETS.length },
    };
  }

  findOne(id: string) {
    const ticket = DUMMY_SUPPORT_TICKETS.find((t) => t.id === id);
    if (!ticket) {
      throw new NotFoundException(`Support ticket with ID "${id}" not found`);
    }
    return {
      success: true,
      message: 'Support ticket fetched successfully',
      data: ticket,
    };
  }

  update(id: string, updateDto: UpdateTicketDto) {
    const ticket = DUMMY_SUPPORT_TICKETS.find((t) => t.id === id);
    if (!ticket) {
      throw new NotFoundException(`Support ticket with ID "${id}" not found`);
    }
    this.logger.log(`Updating support ticket: ${id}`);
    return {
      success: true,
      message: 'Support ticket updated successfully',
      data: { ...ticket, ...updateDto, lastUpdated: new Date().toISOString() },
    };
  }

  remove(id: string) {
    const ticket = DUMMY_SUPPORT_TICKETS.find((t) => t.id === id);
    if (!ticket) {
      throw new NotFoundException(`Support ticket with ID "${id}" not found`);
    }
    this.logger.log(`Soft-deleting support ticket: ${id}`);
    return {
      success: true,
      message: 'Support ticket closed and archived',
      data: { id, isDeleted: true, deletedAt: new Date().toISOString() },
    };
  }
}
