// RESPONSIBILITY: Validates mutation fields exposed by the Admin coupons frontend contract.
// FLOW: HTTP request body â†’ AdminCouponsMutationDto â†’ service business validation â†’ repository mutation.

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsEnum(['active', 'inactive', 'expired'])
  @ApiPropertyOptional({ enum: ['active', 'inactive', 'expired'] })
  status?: string;
}
