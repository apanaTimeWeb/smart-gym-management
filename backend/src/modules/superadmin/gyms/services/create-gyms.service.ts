import { CreateTenantDto } from '../dto/create-gyms.dto';
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { GymsRepository } from '../gyms.repository';
import { ProvisionTenantService } from '../../tenants/services/provision-tenant.service';
import { CouponsRepository } from '../../coupons/coupons.repository';
import { AffiliatesRepository } from '../../affiliates/affiliates.repository';
import { TenantStatus } from '../gyms.interfaces';
import { TenantAlreadyExistsException } from '../gyms.exceptions';
import { GYMS_ERRORS } from '../gyms.constants';

@Injectable()
export class CreateGymsService {
  private readonly logger = new Logger(CreateGymsService.name);

  constructor(
    private readonly repository: GymsRepository,
    private readonly provisionTenantService: ProvisionTenantService,
    private readonly couponsRepository: CouponsRepository,
    private readonly affiliatesRepository: AffiliatesRepository,
  ) {}
  
  async execute(dto: CreateTenantDto): Promise<any> {
    this.logger.log('Creating new gym (tenant)...');

    // 1. Coupon validation
    if (dto.couponCode) {
      const coupon = await this.couponsRepository.findByCode(dto.couponCode);
      if (!coupon) throw new BadRequestException('Invalid coupon code');
      if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) throw new BadRequestException('Coupon expired');
      if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) throw new BadRequestException('Coupon usage limit reached');
      
      // Increment uses
      await this.couponsRepository.update(coupon.id, { currentUses: coupon.currentUses + 1 });
    }

    // 2. Affiliate tracking
    if (dto.referralCode) {
      const affiliate = await this.affiliatesRepository.findByReferralCode(dto.referralCode);
      if (affiliate) {
        // Increment totalReferred
        await this.affiliatesRepository.update(affiliate.id, { totalReferred: affiliate.totalReferred + 1 });
      }
    }

    let gym;
    try {
      gym = await this.repository.create(dto);
    } catch (err: any) {
      if (err.code === '23505') {
        throw new TenantAlreadyExistsException(GYMS_ERRORS.ALREADY_EXISTS);
      }
      throw err;
    }
    
    // Trigger tenant provisioning (database creation, migrations, etc.)
    try {
      await this.provisionTenantService.provisionNewTenant(gym.id, dto.adminEmail, dto.ownerName, dto.temporaryPassword);
      gym.status = TenantStatus.ACTIVE;
      await this.repository.update(gym.id, { status: TenantStatus.ACTIVE });
    } catch (err) {
      this.logger.error('Failed to provision tenant DB', err);
      gym.status = TenantStatus.SUSPENDED;
      await this.repository.update(gym.id, { status: TenantStatus.SUSPENDED });
    }
    
    return { success: true, data: gym };
  }
}
