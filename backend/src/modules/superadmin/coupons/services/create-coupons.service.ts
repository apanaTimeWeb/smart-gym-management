import { CreateCouponDto } from '../dto/create-coupons.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CouponsRepository } from '../coupons.repository';
import * as crypto from 'crypto';

@Injectable()
export class CreateCouponsService {
  constructor(private readonly repository: CouponsRepository) {}
  
  async execute(dto: CreateCouponDto): Promise<any> {
    if (dto.expiryDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const expDate = new Date(dto.expiryDate);
      expDate.setHours(0, 0, 0, 0);
      
      if (expDate < today) {
        throw new BadRequestException('Expiry date cannot be in the past');
      }
    }
    
    if (!dto.code) {
      dto.code = crypto.randomBytes(4).toString('hex').toUpperCase();
    }
    
    const existing = await this.repository.findByCode(dto.code);
    if (existing) {
      if (existing.isDeleted) {
        throw new BadRequestException('Coupon code already exists (but is deleted). Please restore it instead.');
      }
      throw new BadRequestException('Coupon code already exists');
    }

    dto.currentUses = 0;
    return await this.repository.create(dto);
  }
}
