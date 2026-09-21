// RESPONSIBILITY: Validates mutation fields exposed by the Admin coupons frontend contract.
// FLOW: HTTP request body → AdminCouponsMutationDto → service business validation → repository mutation.

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class AdminCouponsMutationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsString()
  minOrderAmount?: string;

  @IsOptional()
  @IsString()
  maxDiscount?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  usageLimit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  usedCount?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  assignedGyms?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  assignedGymNames?: string[];

  @IsOptional()
  @IsString()
  validFrom?: string;

  @IsOptional()
  @IsString()
  validUntil?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
