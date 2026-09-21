// RESPONSIBILITY: Validates creation payloads at the plans HTTP boundary.
// FLOW: HTTP JSON -> PlansCreateDto -> Plans service.
import { IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class PlansCreateDto {
  @IsString()
  name!: string;
  @IsInt()
  @Min(0)
  priceMonthly!: number;
  @IsInt()
  @Min(0)
  priceAnnual!: number;
  @IsInt()
  @Min(0)
  maxMembers!: number;
  @IsInt()
  @Min(0)
  maxStaff!: number;
  @IsInt()
  @Min(0)
  dbLimitGb!: number;
  @IsInt()
  @Min(0)
  binaryLimitGb!: number;
  features!: Record<string, unknown> | unknown[] | null;
  @IsInt()
  @Min(0)
  activeTenants!: number;
  @IsBoolean()
  isPublic!: boolean;
  @IsInt()
  @Min(0)
  trialDays!: number;
  @IsInt()
  @Min(0)
  setupFee!: number;
  @IsString()
  currency!: string;
  @IsBoolean()
  isArchived!: boolean;
}
