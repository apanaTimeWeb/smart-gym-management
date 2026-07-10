import { DUMMY_SUPPORT_TICKETS } from '../../superadmin.constants';
import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from '../dto/create-tickets.dto';
import { UpdateTicketDto } from '../dto/update-tickets.dto';

@Injectable()
export class TicketsService {
  create(createDto: CreateTicketDto) {
    return { success: true, message: 'This action adds a new tickets' };
  }

  findAll() {
    return { success: true, message: 'Data fetched successfully', data: DUMMY_SUPPORT_TICKETS };
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
