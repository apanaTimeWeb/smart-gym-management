import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from '../dto/create-tickets.dto';
import { UpdateTicketDto } from '../dto/update-tickets.dto';

@Injectable()
export class TicketsService {
  create(createDto: CreateTicketDto) {
    return { success: true, message: 'This action adds a new tickets' };
  }

  findAll() {
    return { success: true, message: 'This action returns all tickets' };
  }

  findOne(id: string) {
    return { success: true, message: `This action returns a #${id} tickets` };
  }

  update(id: string, updateDto: UpdateTicketDto) {
    return { success: true, message: `This action updates a #${id} tickets` };
  }

  remove(id: string) {
    return { success: true, message: `This action removes a #${id} tickets` };
  }
}
