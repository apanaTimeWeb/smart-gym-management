import { IsString, IsNumber, IsOptional, Min, Max, IsEnum, IsDateString, IsBoolean, IsArray } from 'class-validator';
import { CouponStatus } from '../coupons.interfaces';

export class CreateCouponDto {
  @IsString()
  @IsOptional()
  code?: string;

  @IsNumber()
  @Min(1)
  discountValue: number;

  @IsEnum(['PERCENTAGE', 'EXACT'])
  @IsOptional()
  discountType?: 'PERCENTAGE' | 'EXACT';

  @IsNumber()
  maxUses: number;

  @IsNumber()
  @IsOptional()
  currentUses?: number;

  @IsString()
  @IsOptional()
  status?: CouponStatus;

  @IsDateString()
  expiryDate: Date;


}
