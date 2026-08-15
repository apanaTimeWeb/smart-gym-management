import { Injectable } from '@nestjs/common';
import { CouponsRepository } from '../coupons.repository';
import { CouponResponse } from '../coupons.interfaces';
import { COUPONS_MESSAGES } from '../coupons.constants';

@Injectable()
export class DeleteCouponsService {
  constructor(private readonly repository: CouponsRepository) {}
  
  async execute(id: string): Promise<CouponResponse> {
    await this.repository.softDelete(id);
    return {
      success: true,
      message: COUPONS_MESSAGES.DELETED,
      data: null
    };
  }
}
