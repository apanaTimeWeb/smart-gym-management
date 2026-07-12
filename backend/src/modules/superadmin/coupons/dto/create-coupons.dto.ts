import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import { CouponStatus } from '../coupons.interfaces';

export class CreateCouponDto {
  @IsString()
  code: string;

  @IsNumber()
  discountPercentage: number;

  @IsNumber()
  maxUses: number;

  @IsNumber()
  currentUses: number;

  @IsString()
  @IsOptional()
  status?: CouponStatus;

  @IsDateString()
  expiryDate: Date;


}
