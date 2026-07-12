import { CreateSaaSInvoiceDto } from '../dto/create-invoices.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InvoicesRepository } from '../invoices.repository';
import { InvoiceStatus } from '../invoices.interfaces';
import { PlansRepository } from '../../plans/plans.repository';
import { CouponsRepository } from '../../coupons/coupons.repository';
import { CouponStatus } from '../../coupons/coupons.interfaces';

@Injectable()
export class CreateInvoicesService {
  constructor(
    private readonly repository: InvoicesRepository,
    private readonly plansRepository: PlansRepository,
    private readonly couponsRepository: CouponsRepository
  ) {}
  
  async execute(dto: CreateSaaSInvoiceDto): Promise<any> {
    if (!dto.tenantName) throw new BadRequestException('Tenant name is required');
    
    // Auto-calculate amount if not provided based on plan
    if (!dto.amount) {
      if (dto.planName) {
        const plans = await this.plansRepository.findAll();
        const plan = plans.find(p => p.name.toUpperCase() === dto.planName?.toUpperCase());
        dto.amount = plan ? Number(plan.priceMonthly) : 0;
      } else {
        dto.amount = 0;
      }
    }

    // Apply Coupon Logic
    if (dto.couponCode) {
      const coupon = await this.couponsRepository.findByCode(dto.couponCode.toUpperCase());
      
      if (!coupon || coupon.isDeleted) {
        throw new BadRequestException('Invalid coupon code');
      }

      if (coupon.status !== CouponStatus.ACTIVE) {
        throw new BadRequestException(`Coupon is ${coupon.status.toLowerCase()}`);
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const expDate = new Date(coupon.expiryDate);
      expDate.setHours(0, 0, 0, 0);

      if (today > expDate) {
        await this.couponsRepository.update(coupon.id, { status: CouponStatus.EXPIRED });
        throw new BadRequestException('Coupon has expired');
      }

      if (coupon.currentUses >= coupon.maxUses) {
        throw new BadRequestException('Coupon max uses reached');
      }

      // Apply discount
      const discountAmount = (dto.amount * coupon.discountPercentage) / 100;
      dto.amount = Math.max(0, dto.amount - discountAmount);

      // Increment usage
      const newUses = coupon.currentUses + 1;
      const statusUpdate = newUses >= coupon.maxUses ? CouponStatus.DEPLETED : CouponStatus.ACTIVE;
      
      await this.couponsRepository.update(coupon.id, {
        currentUses: newUses,
        status: statusUpdate,
      });
    }

    if (!dto.currency) dto.currency = 'USD';
    if (!dto.status) dto.status = InvoiceStatus.PENDING;
    if (!dto.date) dto.date = new Date();

    return await this.repository.create(dto);
  }
}

