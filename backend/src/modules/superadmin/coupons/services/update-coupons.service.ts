import { UpdateCouponDto } from '../dto/update-coupons.dto';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CouponsRepository } from '../coupons.repository';
import { CouponStatus, CouponResponse } from '../coupons.interfaces';
import { COUPONS_MESSAGES } from '../coupons.constants';

@Injectable()
export class UpdateCouponsService {
  constructor(private readonly repository: CouponsRepository) {}
  
  async execute(id: string, dto: UpdateCouponDto): Promise<CouponResponse> {
    const existingCoupon = await this.repository.findById(id);
    if (!existingCoupon) throw new NotFoundException('Coupon not found');

    if (dto.code) {
      const codeCheck = await this.repository.findByCode(dto.code);
      if (codeCheck && codeCheck.id !== id) {
        throw new BadRequestException('Coupon code already exists');
      }
    }

    const finalMaxUses = dto.maxUses ?? existingCoupon.maxUses;
    const finalCurrentUses = dto.currentUses ?? existingCoupon.currentUses;

    if (dto.expiryDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const expDate = new Date(dto.expiryDate);
      expDate.setHours(0, 0, 0, 0);

      if (expDate < today) {
        dto.status = CouponStatus.EXPIRED;
      } else if (existingCoupon.status === CouponStatus.EXPIRED) {
        dto.status = finalCurrentUses >= finalMaxUses ? CouponStatus.DEPLETED : CouponStatus.ACTIVE;
      }
    }

    const finalStatus = dto.status ?? existingCoupon.status;
    
    // Only auto-heal if it's not explicitly set/currently INACTIVE or EXPIRED
    if (finalStatus !== CouponStatus.INACTIVE && finalStatus !== CouponStatus.EXPIRED) {
      if (finalCurrentUses >= finalMaxUses) {
        dto.status = CouponStatus.DEPLETED;
      } else {
        dto.status = CouponStatus.ACTIVE;
      }
    }

    const data = await this.repository.update(id, dto);
    return {
      success: true,
      message: COUPONS_MESSAGES.UPDATED,
      data
    };
  }
}
