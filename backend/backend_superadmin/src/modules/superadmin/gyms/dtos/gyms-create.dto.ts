// RESPONSIBILITY: Validates creation payloads at the gyms HTTP boundary.
// FLOW: HTTP JSON -> GymsCreateDto -> Gyms service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum GymsStatus { ACTIVE = 'ACTIVE', SUSPENDED = 'SUSPENDED', TRIAL = 'TRIAL', CANCELLED = 'CANCELLED', }
export class GymsCreateDto {
  @IsString()
  name!: string;
  @IsString()
  ownerName!: string;
  @IsString()
  @IsEmail()
  adminEmail!: string;
  @IsString()
  phone!: string;
  @IsEnum(GymsStatus)
  status!: GymsStatus;
  @IsString()
  plan!: string;
  @IsInt()
  @Min(0)
  memberCount!: number;
  @IsInt()
  @Min(0)
  monthlyRevenue!: number;
  @IsString()
  databaseVersion!: string;
  @IsString()
  city!: string;
  @IsString()
  state!: string;
  @IsString()
  country!: string;
  @IsString()
  gstin!: string;
  @Type(() => Date)
  @IsDate()
  trialEndsAt!: Date;
  @Type(() => Date)
  @IsDate()
  lastLoginAt!: Date;
  @Type(() => Date)
  @IsDate()
  lastActiveAt!: Date;
  @IsInt()
  @Min(0)
  staffCount!: number;
  @IsString()
  databaseName!: string;
  @IsString()
  aadharNumberEncrypted!: string;
  subscriptionHistory!: Record<string, unknown> | unknown[] | null;
  usageStats!: Record<string, unknown> | unknown[] | null;
}
