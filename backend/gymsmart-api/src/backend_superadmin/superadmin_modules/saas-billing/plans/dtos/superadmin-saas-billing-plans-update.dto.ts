// RESPONSIBILITY: Validates partial updates at the plans HTTP boundary.
// FLOW: HTTP JSON -> SuperadminPlansUpdateDto -> Plans service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class SuperadminPlansUpdateDto {
  @IsOptional()
  @IsString()
  name!: string;
  @IsOptional()
  @IsInt()
  @Min(0)
  priceMonthly!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  priceAnnual!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  maxMembers!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  maxStaff!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  dbLimitGb!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  binaryLimitGb!: number;
  @IsOptional()
  features!: Record<string, unknown> | unknown[] | null;
  @IsOptional()
  @IsInt()
  @Min(0)
  activeTenants!: number;
  @IsOptional()
  @IsBoolean()
  isPublic!: boolean;
  @IsOptional()
  @IsInt()
  @Min(0)
  trialDays!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  setupFee!: number;
  @IsOptional()
  @IsString()
  currency!: string;
  @IsOptional()
  @IsBoolean()
  isArchived!: boolean;
}