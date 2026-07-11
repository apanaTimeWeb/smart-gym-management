import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import type {  SaaSPlanTier, TenantStatus  } from '../gyms.interfaces';

export class CreateTenantDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  ownerName?: string;

  @IsString()
  @IsOptional()
  adminEmail?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  status?: TenantStatus;

  @IsString()
  @IsOptional()
  plan?: SaaSPlanTier;

  @IsDateString()
  @IsNumber()
  @IsOptional()
  memberCount?: number;

  @IsNumber()
  @IsOptional()
  monthlyRevenue?: number;

  @IsString()
  @IsOptional()
  databaseVersion?: string;


}
