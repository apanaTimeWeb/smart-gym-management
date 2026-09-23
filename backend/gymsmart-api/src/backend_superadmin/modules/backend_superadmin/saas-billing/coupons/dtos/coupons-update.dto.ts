// RESPONSIBILITY: Validates partial updates at the coupons HTTP boundary.
// FLOW: HTTP JSON -> CouponsUpdateDto -> Coupons service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum CouponsDiscountType { PERCENTAGE = 'PERCENTAGE', EXACT = 'EXACT', }
export enum CouponsStatus { ACTIVE = 'ACTIVE', INACTIVE = 'INACTIVE', EXPIRED = 'EXPIRED', DEPLETED = 'DEPLETED', }
export class CouponsUpdateDto {
  @IsOptional()
  @IsString()
  code!: string;
  @IsOptional()
  @IsEnum(CouponsDiscountType)
  discountType!: CouponsDiscountType;
  @IsOptional()
  @IsInt()
  @Min(0)
  discountValue!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  maxUses!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  currentUses!: number;
  @IsOptional()
  @IsEnum(CouponsStatus)
  status!: CouponsStatus;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  expiryDate!: Date;
}