import { DUMMY_SUBSCRIPTION_PLANS } from '../../superadmin.constants';
import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from '../dto/create-plans.dto';
import { UpdatePlanDto } from '../dto/update-plans.dto';

@Injectable()
export class PlansService {
  create(createDto: CreatePlanDto) {
    return { success: true, message: 'This action adds a new plans' };
  }

  findAll() {
    return { success: true, message: 'Data fetched successfully', data: DUMMY_SUBSCRIPTION_PLANS };
  }

  findOne(id: string) {
    return { success: true, message: `This action returns a #${id} plans` };
  }

  update(id: string, updateDto: UpdatePlanDto) {
    return { success: true, message: `This action updates a #${id} plans` };
  }

  remove(id: string) {
    return { success: true, message: `This action removes a #${id} plans` };
  }
}
