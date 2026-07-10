import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from '../dto/create-coupons.dto';
import { UpdateCouponDto } from '../dto/update-coupons.dto';

@Injectable()
export class CouponsService {
  create(createDto: CreateCouponDto) {
    return { success: true, message: 'This action adds a new coupons' };
  }

  findAll() {
    return { success: true, message: 'This action returns all coupons' };
  }

  findOne(id: string) {
    return { success: true, message: `This action returns a #${id} coupons` };
  }

  update(id: string, updateDto: UpdateCouponDto) {
    return { success: true, message: `This action updates a #${id} coupons` };
  }

  remove(id: string) {
    return { success: true, message: `This action removes a #${id} coupons` };
  }
}
