import { UpdateCouponDto } from '../dto/update-coupons.dto';
import { Injectable } from '@nestjs/common';
import { CouponsRepository } from '../coupons.repository';

@Injectable()
export class UpdateCouponsService {
  constructor(private readonly repository: CouponsRepository) {}
  
  async execute(id: string, dto: UpdateCouponDto): Promise<any> {
    return await this.repository.update(id, dto);
  }
}
