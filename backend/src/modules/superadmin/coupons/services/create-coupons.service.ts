import { Injectable, BadRequestException } from '@nestjs/common';
import { CouponsRepository } from '../coupons.repository';
import * as crypto from 'crypto';

@Injectable()
export class CreateCouponsService {
  constructor(private readonly repository: CouponsRepository) {}
  
  async execute(dto: CreateCouponsDto): Promise<any> {
    if (dto.expiryDate && new Date(dto.expiryDate) < new Date()) {
      throw new BadRequestException('Expiry date cannot be in the past');
    }
    
    if (!dto.code) {
      dto.code = crypto.randomBytes(4).toString('hex').toUpperCase();
    }
    
    const existing = await this.repository.findByCode(dto.code);
    if (existing) {
      throw new BadRequestException('Coupon code already exists');
    }

    dto.currentUses = 0;
    return await this.repository.create(dto);
  }
}
