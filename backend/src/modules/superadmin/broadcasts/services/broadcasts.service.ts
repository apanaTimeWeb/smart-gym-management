import { Injectable } from '@nestjs/common';
import { CreateBroadcastDto } from '../dto/create-broadcasts.dto';
import { UpdateBroadcastDto } from '../dto/update-broadcasts.dto';

@Injectable()
export class BroadcastsService {
  create(createDto: CreateBroadcastDto) {
    return { success: true, message: 'This action adds a new broadcasts' };
  }

  findAll() {
    return { success: true, message: 'This action returns all broadcasts' };
  }

  findOne(id: string) {
    return { success: true, message: `This action returns a #${id} broadcasts` };
  }

  update(id: string, updateDto: UpdateBroadcastDto) {
    return { success: true, message: `This action updates a #${id} broadcasts` };
  }

  remove(id: string) {
    return { success: true, message: `This action removes a #${id} broadcasts` };
  }
}
