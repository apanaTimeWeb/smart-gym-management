// RESPONSIBILITY: Validates partial updates at the broadcasts HTTP boundary.
// FLOW: HTTP JSON -> BroadcastsUpdateDto -> Broadcasts service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum BroadcastsStatus { SENT = 'SENT', SCHEDULED = 'SCHEDULED', DRAFT = 'DRAFT', }
export enum BroadcastsAudience { ALLTENANTS = 'ALL_TENANTS', PROONLY = 'PRO_ONLY', SUSPENDEDONLY = 'SUSPENDED_ONLY', }
export class BroadcastsUpdateDto {
  @IsOptional()
  @IsString()
  title!: string;
  @IsOptional()
  @IsString()
  content!: string;
  @IsOptional()
  @IsEnum(BroadcastsStatus)
  status!: BroadcastsStatus;
  @IsOptional()
  targetGymIds!: Record<string, unknown> | unknown[] | null;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  scheduledDate!: Date;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  sentDate!: Date;
  @IsOptional()
  @IsInt()
  @Min(0)
  totalRecipients!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  deliveredCount!: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  failedCount!: number;
  @IsOptional()
  @IsEnum(BroadcastsAudience)
  audience!: BroadcastsAudience;
}
