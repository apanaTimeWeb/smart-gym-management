// RESPONSIBILITY: Validates CouponsStatusDto request input at the HTTP boundary.
// FLOW: HTTP JSON -> DTO -> feature use-case service.
import { IsEnum } from 'class-validator';
import { CouponsStatus } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/dtos/coupons-update.dto';

export class CouponsStatusDto {
  @IsEnum(CouponsStatus)
  status!: CouponsStatus;
}