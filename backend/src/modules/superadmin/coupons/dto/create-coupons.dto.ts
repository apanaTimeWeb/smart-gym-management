import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import { CouponStatus } from '../coupons.interfaces';

export class CreateCouponDto {
  @IsString()
  code: string;

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
