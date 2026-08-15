import { Injectable , NotFoundException} from '@nestjs/common';
import { CouponsRepository } from '../coupons.repository';
import { CouponStatus, CouponResponse } from '../coupons.interfaces';
import { COUPONS_MESSAGES, COUPONS_ERRORS } from '../coupons.constants';

@Injectable()
export class FindCouponsService {
  constructor(private readonly repository: CouponsRepository) {}
  
  async execute(): Promise<CouponResponse> {
    const coupons = await this.repository.findAll();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const result = coupons.map(c => {
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

    return {
      success: true,
      message: COUPONS_MESSAGES.FETCHED,
      data: result
    };
  }
  async findOne(id: string): Promise<CouponResponse> {
    const data = await this.repository.findById(id);
    if (!data) throw new NotFoundException(COUPONS_ERRORS.NOT_FOUND);
    return {
      success: true,
      message: COUPONS_MESSAGES.FETCHED,
      data
    };
  }
}
