// RESPONSIBILITY: Validates creation payloads at the messaging HTTP boundary.
// FLOW: HTTP JSON -> MessagingCreateDto -> Messaging service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum MessagingChannel { EMAIL = 'EMAIL', WHATSAPP = 'WHATSAPP', SMS = 'SMS', }
export enum MessagingStatus { QUEUED = 'QUEUED', SENT = 'SENT', FAILED = 'FAILED', SCHEDULED = 'SCHEDULED', }
export class MessagingCreateDto {
  @IsString()
  tenantId!: string;
  @IsString()
  tenantName!: string;
  @IsEnum(MessagingChannel)
  channel!: MessagingChannel;
  @IsString()
  subject!: string;
  @IsString()
  body!: string;
  @IsEnum(MessagingStatus)
  status!: MessagingStatus;
  @Type(() => Date)
  @IsDate()
  sentAt!: Date;
  @Type(() => Date)
  @IsDate()
  scheduledAt!: Date;
}