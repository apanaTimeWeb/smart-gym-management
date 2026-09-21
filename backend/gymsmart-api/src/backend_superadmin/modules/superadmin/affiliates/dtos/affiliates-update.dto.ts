// RESPONSIBILITY: Validates partial updates at the affiliates HTTP boundary.
// FLOW: HTTP JSON -> AffiliatesUpdateDto -> Affiliates service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum AffiliatesStatus { ACTIVE = 'ACTIVE', INACTIVE = 'INACTIVE', }
export class AffiliatesUpdateDto {
  @IsOptional()
  @IsString()
  name!: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  email!: string;
  @IsOptional()
  @IsString()
  phone!: string;
  @IsOptional()
  @IsString()
  referralCode!: string;
  @IsOptional()
  @IsInt()
  @Min(0)
  totalReferred!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  commissionEarned!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  commissionRate!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  pendingPayout!: number;
  @IsOptional()
  bankDetails!: Record<string, unknown> | unknown[] | null;
  @IsOptional()
  @IsEnum(AffiliatesStatus)
  status!: AffiliatesStatus;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  joinedAt!: Date;
  @IsOptional()
  @IsInt()
  @Min(0)
  referralCount!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  conversionRate!: number;
}
