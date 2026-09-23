// RESPONSIBILITY: Validates creation payloads at the tickets HTTP boundary.
// FLOW: HTTP JSON -> TicketsCreateDto -> Tickets service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum TicketsStatus { OPEN = 'OPEN', INPROGRESS = 'IN_PROGRESS', RESOLVED = 'RESOLVED', CLOSED = 'CLOSED', WAITING = 'WAITING', }
export enum TicketsPriority { LOW = 'LOW', MEDIUM = 'MEDIUM', HIGH = 'HIGH', CRITICAL = 'CRITICAL', NORMAL = 'NORMAL', URGENT = 'URGENT', }
export class TicketsCreateDto {
  @IsString()
  tenantId!: string;
  @IsString()
  tenantName!: string;
  @IsString()
  @IsEmail()
  reporterEmail!: string;
  @IsString()
  subject!: string;
  @IsString()
  description!: string;
  @IsEnum(TicketsStatus)
  status!: TicketsStatus;
  @IsEnum(TicketsPriority)
  priority!: TicketsPriority;
  @IsString()
  assignedTo!: string;
  attachments!: Record<string, unknown> | unknown[] | null;
  @Type(() => Date)
  @IsDate()
  slaDeadline!: Date;
  @Type(() => Date)
  @IsDate()
  firstResponseAt!: Date;
  @IsInt()
  @Min(0)
  resolutionTime!: number;
  messages!: Record<string, unknown> | unknown[] | null;
  @Type(() => Date)
  @IsDate()
  lastUpdated!: Date;
}