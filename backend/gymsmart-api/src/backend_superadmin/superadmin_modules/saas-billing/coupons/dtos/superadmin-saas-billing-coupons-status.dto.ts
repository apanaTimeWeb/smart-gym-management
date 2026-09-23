// RESPONSIBILITY: Validates SuperadminCouponsStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { CouponsStatus } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/dtos/superadmin-saas-billing-coupons-update.dto';

export class SuperadminCouponsStatusDto {
  @IsEnum(CouponsStatus)
  status!: CouponsStatus;
}