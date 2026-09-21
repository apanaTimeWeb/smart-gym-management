// RESPONSIBILITY: Validates partial updates at the usage-meters HTTP boundary.
// FLOW: HTTP JSON -> UsageMetersUpdateDto -> UsageMeters service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
export class UsageMetersUpdateDto {
  @IsOptional()
  @IsString()
  tenantId!: string;
  @IsOptional()
  @IsString()
  tenantName!: string;
  @IsOptional()
  @IsInt()
  @Min(0)
  smsSent!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  smsLimit!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  whatsappMessagesSent!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  whatsappLimit!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  emailsSent!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  emailLimit!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  apiCallsCount!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  apiCallsLimit!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  databaseGb!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  mediaGb!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  storageLimitGb!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  activeMembers!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  totalMembers!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  memberLimit!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  staffCount!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  staffLimit!: number;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  billingCycleEnd!: Date;
}
