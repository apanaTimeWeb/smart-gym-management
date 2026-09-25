// RESPONSIBILITY: Validates mutation fields exposed by the Admin subscriptions frontend contract.
// FLOW: HTTP request body â†’ AdminSubscriptionsMutationDto â†’ service business validation â†’ repository mutation.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type, Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID, IsEnum, IsInt } from 'class-validator';

import { AdminSubscriptionsStatus, AdminSubscriptionsTier } from '@/backend_admin/admin_modules/admin_subscriptions/admin-subscriptions.constants'

/**
 * @description Defines the AdminSubscriptionsMutationDto boundary for the admin_subscriptions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSubscriptionsMutationDto {
@ApiPropertyOptional() @IsOptional()
  @IsUUID()
  id?: string;

@ApiPropertyOptional() @IsOptional()
  @IsUUID()
  planId?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  planName?: string;

@ApiPropertyOptional() @IsOptional()
  @Transform(({ value }) => typeof value === 'string' ? value.trim().toUpperCase() : value)
  @IsEnum(AdminSubscriptionsTier)
  tier?: AdminSubscriptionsTier;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsInt()
  monthlyPrice?: number;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsInt()
  annualPrice?: number;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  billingCycle?: string;

@ApiPropertyOptional() @IsOptional()
  @Transform(({ value }) => typeof value === 'string' ? value.trim().toUpperCase() : value)
  @IsEnum(AdminSubscriptionsStatus)
  status?: AdminSubscriptionsStatus;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  currentPeriodStart?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  currentPeriodEnd?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  nextBillingDate?: string;

@ApiPropertyOptional() @IsOptional()
  @IsBoolean()
  autoRenew?: boolean;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  gymCount?: number;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  memberLimit?: number;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  staffLimit?: number;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  storageGb?: number;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  plans?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  invoices?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  paymentMethods?: string;

@ApiPropertyOptional() @IsOptional()
  @IsObject()
  kpi?: Record<string, unknown>;

  @ApiProperty({ description: 'ISO 4217 currency code', example: 'INR' })
  currency!: string;
}
