import { Injectable } from '@nestjs/common';
import { CouponsRepository } from '../coupons.repository';
import { CouponStatus } from '../coupons.interfaces';

@Injectable()
export class FindCouponsService {
  constructor(private readonly repository: CouponsRepository) {}
  
  async execute(): Promise<any[]> {
    const coupons = await this.repository.findAll();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return coupons.map(c => {
      if (!c.expiryDate) return c;
      const expDate = new Date(c.expiryDate);
      expDate.setHours(0, 0, 0, 0);
      if (today > expDate && (c.status === CouponStatus.ACTIVE || c.status === CouponStatus.INACTIVE)) {
        // Technically, this doesn't persist the change, it just lazily evaluates it for the UI.
        // It will be persisted upon edit or usage.
        return { ...c, status: CouponStatus.EXPIRED };
      }
      return c;
    });
  }
  async findOne(id: string): Promise<any> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new Error('Coupon not found');
    return entity;
  }
}
