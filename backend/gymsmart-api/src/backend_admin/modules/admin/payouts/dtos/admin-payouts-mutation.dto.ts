// RESPONSIBILITY: Validates mutation fields exposed by the Admin payouts frontend contract.
// FLOW: HTTP request body → AdminPayoutsMutationDto → service business validation → repository mutation.

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class AdminPayoutsMutationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  gymId?: number;

  @IsOptional()
  @IsString()
  gymName?: string;

  @IsOptional()
  @IsString()
  month?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  grossRevenue?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  staffPayroll?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  operationalExpenses?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  platformFee?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  netProfit?: number;

  @IsOptional()
  @IsString()
  payoutStatus?: string;

  @IsOptional()
  @IsString()
  paidOn?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  approvedBy?: number;

  @IsOptional()
  @IsString()
  approvedAt?: string;

  @IsOptional()
  @IsString()
  rejectionReason?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  revenue?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  cogs?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  grossProfit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  staffCost?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  rentUtilities?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  marketing?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  miscExpenses?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  ebitda?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  tax?: number;
}
