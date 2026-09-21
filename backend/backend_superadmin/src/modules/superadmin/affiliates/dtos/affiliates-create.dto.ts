// RESPONSIBILITY: Validates creation payloads at the affiliates HTTP boundary.
// FLOW: HTTP JSON -> AffiliatesCreateDto -> Affiliates service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum AffiliatesStatus { ACTIVE = 'ACTIVE', INACTIVE = 'INACTIVE', }
export class AffiliatesCreateDto {
  @IsString()
  name!: string;
  @IsString()
  @IsEmail()
  email!: string;
  @IsString()
  phone!: string;
  @IsString()
  referralCode!: string;
  @IsInt()
  @Min(0)
  totalReferred!: number;
  @IsInt()
  @Min(0)
  commissionEarned!: number;
  @IsInt()
  @Min(0)
  commissionRate!: number;
  @IsInt()
  @Min(0)
  pendingPayout!: number;
  bankDetails!: Record<string, unknown> | unknown[] | null;
  @IsEnum(AffiliatesStatus)
  status!: AffiliatesStatus;
  @Type(() => Date)
  @IsDate()
  joinedAt!: Date;
  @IsInt()
  @Min(0)
  referralCount!: number;
  @IsInt()
  @Min(0)
  conversionRate!: number;
}
