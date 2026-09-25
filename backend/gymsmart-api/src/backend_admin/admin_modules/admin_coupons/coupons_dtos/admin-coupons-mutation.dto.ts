// RESPONSIBILITY: Validates mutation fields exposed by the Admin coupons frontend contract.
// FLOW: HTTP request body â†’ AdminCouponsMutationDto â†’ service business validation â†’ repository mutation.
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

import { Type, Transform } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { AdminCouponsStatus } from '@/backend_admin/admin_modules/admin_coupons/admin-coupons.constants.js';

/**
 * @description Defines the AdminCouponsMutationDto boundary for the admin_coupons backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCouponsMutationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  code?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  description?: string;

  @IsOptional()
  @IsEnum(['percentage', 'flat'])
  @ApiPropertyOptional({ enum: ['percentage', 'flat'] })
  type?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional()
  value?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional()
  minOrderAmount?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional()
  maxDiscount?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional()
  usageLimit?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional()
  usedCount?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional()
  assignedGyms?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional()
  assignedGymNames?: string[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  validFrom?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  validUntil?: string;

  @IsOptional()
  @IsEnum(AdminCouponsStatus)
  @ApiPropertyOptional({ enum: AdminCouponsStatus })
  status?: AdminCouponsStatus;
}
