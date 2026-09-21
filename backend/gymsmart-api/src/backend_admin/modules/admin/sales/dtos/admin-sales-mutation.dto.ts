// RESPONSIBILITY: Validates mutation fields exposed by the Admin sales frontend contract.
// FLOW: HTTP request body → AdminSalesMutationDto → service business validation → repository mutation.

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class AdminSalesMutationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsObject()
  monthlyRevenue?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  overviewData?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  referralData?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  report?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  totals?: Record<string, unknown>;

  @IsOptional()
  @IsString()
  members?: string;

  @IsOptional()
  @IsString()
  total?: string;

  @IsOptional()
  @IsObject()
  orders?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  summary?: Record<string, unknown>;

  @IsOptional()
  @IsString()
  allMemberships?: string;

  @IsOptional()
  @IsObject()
  storeProducts?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  storeOrders?: Record<string, unknown>;
}
