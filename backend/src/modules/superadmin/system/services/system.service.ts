import { Injectable } from '@nestjs/common';
import { CreateSystemDto } from '../dto/create-system.dto';
import { UpdateSystemDto } from '../dto/update-system.dto';

@Injectable()
export class SystemService {
  create(createDto: CreateSystemDto) {
    return { success: true, message: 'This action adds a new system' };
  }

  findAll() {
    return { success: true, message: 'This action returns all system' };
  }

  findOne(id: string) {
    return { success: true, message: `This action returns a #${id} system` };
  }

  update(id: string, updateDto: UpdateSystemDto) {
    return { success: true, message: `This action updates a #${id} system` };
  }

  remove(id: string) {
    return { success: true, message: `This action removes a #${id} system` };
  }
}
