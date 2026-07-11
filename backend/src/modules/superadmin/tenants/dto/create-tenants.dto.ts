import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import { SaaSPlanTier, TenantStatus } from '../tenants.interfaces';

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

  @IsDateString()
  @IsNumber()
  memberCount: number;

  @IsNumber()
  monthlyRevenue: number;

  @IsString()
  databaseVersion: string;


}
