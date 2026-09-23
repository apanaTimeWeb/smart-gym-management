// RESPONSIBILITY: Validates creation payloads at the broadcasts HTTP boundary.
// FLOW: HTTP JSON -> SuperadminBroadcastsCreateDto -> Broadcasts service.
import { Type } from 'class-transformer';
import { BroadcastChannel } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.entity';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum BroadcastsStatus { SENT = 'SENT', SCHEDULED = 'SCHEDULED', DRAFT = 'DRAFT', }
export enum BroadcastsAudience { ALLTENANTS = 'ALL_TENANTS', PROONLY = 'PRO_ONLY', SUSPENDEDONLY = 'SUSPENDED_ONLY', }
export class SuperadminBroadcastsCreateDto {
  @IsString()
  title!: string;
  @IsString()
  content!: string;
  @IsEnum(BroadcastsStatus)
  status!: BroadcastsStatus;
  targetGymIds!: Record<string, unknown> | unknown[] | null;
  @Type(() => Date)
  @IsDate()
  scheduledDate!: Date;
  @Type(() => Date)
  @IsDate()
  sentDate!: Date;
  @IsInt()
  @Min(0)
  totalRecipients!: number;
  @IsInt()
  @Min(0)
  deliveredCount!: number;
  @IsInt()
  @Min(0)
  failedCount!: number;
  @IsEnum(BroadcastsAudience)
  audience!: BroadcastsAudience;
  @IsOptional()
  @IsEnum(BroadcastChannel)
  channel: BroadcastChannel = BroadcastChannel.EMAIL;
  @IsOptional()
  @IsInt()
  @Min(0)
  openedCount = 0;
  @IsOptional()
  @IsInt()
  @Min(0)
  clickedCount = 0;
}