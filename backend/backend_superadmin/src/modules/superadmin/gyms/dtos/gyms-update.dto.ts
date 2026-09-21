// RESPONSIBILITY: Validates partial updates at the gyms HTTP boundary.
// FLOW: HTTP JSON -> GymsUpdateDto -> Gyms service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum GymsStatus { ACTIVE = 'ACTIVE', SUSPENDED = 'SUSPENDED', TRIAL = 'TRIAL', CANCELLED = 'CANCELLED', }
export class GymsUpdateDto {
  @IsOptional()
  @IsString()
  name!: string;
  @IsOptional()
  @IsString()
  ownerName!: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  adminEmail!: string;
  @IsOptional()
  @IsString()
  phone!: string;
  @IsOptional()
  @IsEnum(GymsStatus)
  status!: GymsStatus;
  @IsOptional()
  @IsString()
  plan!: string;
  @IsOptional()
  @IsInt()
  @Min(0)
  memberCount!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  monthlyRevenue!: number;
  @IsOptional()
  @IsString()
  databaseVersion!: string;
  @IsOptional()
  @IsString()
  city!: string;
  @IsOptional()
  @IsString()
  state!: string;
  @IsOptional()
  @IsString()
  country!: string;
  @IsOptional()
  @IsString()
  gstin!: string;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  trialEndsAt!: Date;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  lastLoginAt!: Date;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  lastActiveAt!: Date;
  @IsOptional()
  @IsInt()
  @Min(0)
  staffCount!: number;
  @IsOptional()
  @IsString()
  databaseName!: string;
  @IsOptional()
  @IsString()
  aadharNumberEncrypted!: string;
  @IsOptional()
  subscriptionHistory!: Record<string, unknown> | unknown[] | null;
  @IsOptional()
  usageStats!: Record<string, unknown> | unknown[] | null;
}
