import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
  Min,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CouponStatus } from '../entities/coupons.entity';

export class CreateCouponDto {
  @ApiProperty({ description: 'Unique promotion code (uppercase)', example: 'LAUNCH50' })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  code: string;

  @ApiProperty({ description: 'Discount percentage (0-100)', example: 50 })
  @IsNumber()
  @Min(0.01)
  @Max(100)
  discountPercentage: number;

  @ApiProperty({ description: 'Maximum number of times this coupon can be used', example: 100 })
  @IsNumber()
  @Min(1)
  maxUses: number;

  @ApiPropertyOptional({ description: 'Current number of uses (usually 0 on creation)', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  currentUses?: number;

  @ApiPropertyOptional({ enum: CouponStatus, default: CouponStatus.ACTIVE })
  @IsOptional()
  @IsEnum(CouponStatus)
  status?: CouponStatus;

  @ApiProperty({ description: 'Coupon expiry date (ISO 8601)', example: '2026-12-31T23:59:59Z' })
  @IsDateString()
  expiryDate: string;
}
