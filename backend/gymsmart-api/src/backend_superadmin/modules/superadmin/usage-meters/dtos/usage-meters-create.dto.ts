// RESPONSIBILITY: Validates creation payloads at the usage-meters HTTP boundary.
// FLOW: HTTP JSON -> UsageMetersCreateDto -> UsageMeters service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class UsageMetersCreateDto {
  @IsString()
  tenantId!: string;
  @IsString()
  tenantName!: string;
  @IsInt()
  @Min(0)
  smsSent!: number;
  @IsInt()
  @Min(0)
  smsLimit!: number;
  @IsInt()
  @Min(0)
  whatsappMessagesSent!: number;
  @IsInt()
  @Min(0)
  whatsappLimit!: number;
  @IsInt()
  @Min(0)
  emailsSent!: number;
  @IsInt()
  @Min(0)
  emailLimit!: number;
  @IsInt()
  @Min(0)
  apiCallsCount!: number;
  @IsInt()
  @Min(0)
  apiCallsLimit!: number;
  @IsInt()
  @Min(0)
  databaseGb!: number;
  @IsInt()
  @Min(0)
  mediaGb!: number;
  @IsInt()
  @Min(0)
  storageLimitGb!: number;
  @IsInt()
  @Min(0)
  activeMembers!: number;
  @IsInt()
  @Min(0)
  totalMembers!: number;
  @IsInt()
  @Min(0)
  memberLimit!: number;
  @IsInt()
  @Min(0)
  staffCount!: number;
  @IsInt()
  @Min(0)
  staffLimit!: number;
  @Type(() => Date)
  @IsDate()
  billingCycleEnd!: Date;
}