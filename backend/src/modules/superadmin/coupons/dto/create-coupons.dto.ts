import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import { CouponStatus } from '../coupons.interfaces';

export class CreateCouponDto {
  @IsString()
  @IsOptional()
  code?: string;

  @IsNumber()
  @IsOptional()
  discountPercentage?: number;

  @IsNumber()
  @IsOptional()
  maxUses?: number;

  @IsNumber()
  @IsOptional()
  currentUses?: number;

  @IsString()
  @IsOptional()
  status?: CouponStatus;

  @IsDateString()
  @IsOptional()
  expiryDate?: Date;


}
