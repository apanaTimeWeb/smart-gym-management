import { DUMMY_TENANTS } from '../../superadmin.constants';
import { Injectable } from '@nestjs/common';
import { CreateGymDto } from '../dto/create-gyms.dto';
import { UpdateGymDto } from '../dto/update-gyms.dto';

@Injectable()
export class GymsService {
  create(createDto: CreateGymDto) {
    return { success: true, message: 'This action adds a new gyms' };
  }

  findAll() {
    return { success: true, message: 'Data fetched successfully', data: DUMMY_TENANTS };
  }

  findOne(id: string) {
    return { success: true, message: `This action returns a #${id} gyms` };
  }

  update(id: string, updateDto: UpdateGymDto) {
    return { success: true, message: `This action updates a #${id} gyms` };
  }

  remove(id: string) {
    return { success: true, message: `This action removes a #${id} gyms` };
  }
}
