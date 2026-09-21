// RESPONSIBILITY: Validates partial updates at the messaging HTTP boundary.
// FLOW: HTTP JSON -> MessagingUpdateDto -> Messaging service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum MessagingChannel { EMAIL = 'EMAIL', WHATSAPP = 'WHATSAPP', SMS = 'SMS', }
export enum MessagingStatus { QUEUED = 'QUEUED', SENT = 'SENT', FAILED = 'FAILED', SCHEDULED = 'SCHEDULED', }
export class MessagingUpdateDto {
  @IsOptional()
  @IsString()
  tenantId!: string;
  @IsOptional()
  @IsString()
  tenantName!: string;
  @IsOptional()
  @IsEnum(MessagingChannel)
  channel!: MessagingChannel;
  @IsOptional()
  @IsString()
  subject!: string;
  @IsOptional()
  @IsString()
  body!: string;
  @IsOptional()
  @IsEnum(MessagingStatus)
  status!: MessagingStatus;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  sentAt!: Date;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  scheduledAt!: Date;
}
