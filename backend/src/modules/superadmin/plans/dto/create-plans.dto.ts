import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsArray,
  IsPositive,
  Min,
  MaxLength,
  ArrayNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SaaSPlanTier } from '../entities/plans.entity';

export class CreatePlanDto {
  @ApiProperty({ enum: SaaSPlanTier, description: 'Unique SaaS plan tier name' })
  @IsEnum(SaaSPlanTier)
  name: SaaSPlanTier;

  @ApiProperty({ description: 'Monthly price in USD', example: 99 })
  @IsNumber()
  @Min(0)
  priceMonthly: number;

  @ApiProperty({ description: 'Annual price in USD', example: 990 })
  @IsNumber()
  @Min(0)
  priceAnnual: number;

  @ApiProperty({ description: 'Maximum number of gym members allowed', example: 1000 })
  @IsNumber()
  @IsPositive()
  maxMembers: number;

  @ApiProperty({ description: 'Maximum number of gym staff accounts allowed', example: 10 })
  @IsNumber()
  @IsPositive()
  maxStaff: number;

  @ApiProperty({
    description: 'List of feature descriptions included in this plan',
    example: ['Member Management', 'Basic Billing', 'WhatsApp Integration'],
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  features: string[];

  @ApiPropertyOptional({ description: 'Current number of active tenants on this plan', example: 68 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  activeTenants?: number;
}
