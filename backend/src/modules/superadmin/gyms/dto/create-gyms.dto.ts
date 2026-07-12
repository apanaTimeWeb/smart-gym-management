import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray, IsEnum } from 'class-validator';
import { TenantStatus } from '../gyms.interfaces';

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
  plan: string;

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

  @IsString()
  temporaryPassword?: string;
}
