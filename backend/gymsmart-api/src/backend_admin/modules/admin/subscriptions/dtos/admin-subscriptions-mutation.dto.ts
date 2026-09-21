// RESPONSIBILITY: Validates mutation fields exposed by the Admin subscriptions frontend contract.
// FLOW: HTTP request body → AdminSubscriptionsMutationDto → service business validation → repository mutation.

import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class AdminSubscriptionsMutationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsUUID()
  planId?: string;

  @IsOptional()
  @IsString()
  planName?: string;

  @IsOptional()
  @IsString()
  tier?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  monthlyPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  annualPrice?: number;

  @IsOptional()
  @IsString()
  billingCycle?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  currentPeriodStart?: string;

  @IsOptional()
  @IsString()
  currentPeriodEnd?: string;

  @IsOptional()
  @IsString()
  nextBillingDate?: string;

  @IsOptional()
  @IsBoolean()
  autoRenew?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  gymCount?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  memberLimit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  staffLimit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  storageGb?: number;

  @IsOptional()
  @IsString()
  plans?: string;

  @IsOptional()
  @IsString()
  invoices?: string;

  @IsOptional()
  @IsString()
  paymentMethods?: string;

  @IsOptional()
  @IsObject()
  kpi?: Record<string, unknown>;
}
