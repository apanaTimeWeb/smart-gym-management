import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString, IsArray } from 'class-validator';
import { TenantStatus } from '../tenants.interfaces';

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

  @IsDateString()
  @IsNumber()
  memberCount: number;

  @IsNumber()
  monthlyRevenue: number;

  @IsString()
  databaseVersion: string;


}
