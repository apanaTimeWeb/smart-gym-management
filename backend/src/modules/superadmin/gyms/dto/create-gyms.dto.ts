import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import { SaaSPlanTier, TenantStatus } from '../gyms.interfaces';

export class CreateTenantDto {
  @IsString()
  name: string;

  @IsString()
  ownerName: string;

  @IsString()
  adminEmail: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  status?: TenantStatus;

  @IsString()
  plan: SaaSPlanTier;

  @IsNumber()
  memberCount: number;

  @IsNumber()
  monthlyRevenue: number;

  @IsString()
  databaseVersion: string;

  @IsString()
  @IsOptional()
  couponCode?: string;

  @IsString()
  @IsOptional()
  referralCode?: string;
}
