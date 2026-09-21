// RESPONSIBILITY: Validates creation payloads at the coupons HTTP boundary.
// FLOW: HTTP JSON -> CouponsCreateDto -> Coupons service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum CouponsDiscountType { PERCENTAGE = 'PERCENTAGE', EXACT = 'EXACT', }
export enum CouponsStatus { ACTIVE = 'ACTIVE', INACTIVE = 'INACTIVE', EXPIRED = 'EXPIRED', DEPLETED = 'DEPLETED', }
export class CouponsCreateDto {
  @IsString()
  code!: string;
  @IsEnum(CouponsDiscountType)
  discountType!: CouponsDiscountType;
  @IsInt()
  @Min(0)
  discountValue!: number;
  @IsInt()
  @Min(0)
  maxUses!: number;
  @IsInt()
  @Min(0)
  currentUses!: number;
  @IsEnum(CouponsStatus)
  status!: CouponsStatus;
  @Type(() => Date)
  @IsDate()
  expiryDate!: Date;
}
