// RESPONSIBILITY: Validates partial updates at the tickets HTTP boundary.
// FLOW: HTTP JSON -> TicketsUpdateDto -> Tickets service.
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum TicketsStatus { OPEN = 'OPEN', INPROGRESS = 'IN_PROGRESS', RESOLVED = 'RESOLVED', CLOSED = 'CLOSED', WAITING = 'WAITING', }
export enum TicketsPriority { LOW = 'LOW', MEDIUM = 'MEDIUM', HIGH = 'HIGH', CRITICAL = 'CRITICAL', NORMAL = 'NORMAL', URGENT = 'URGENT', }
export class TicketsUpdateDto {
  @IsOptional()
  @IsString()
  tenantId!: string;
  @IsOptional()
  @IsString()
  tenantName!: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  reporterEmail!: string;
  @IsOptional()
  @IsString()
  subject!: string;
  @IsOptional()
  @IsString()
  description!: string;
  @IsOptional()
  @IsEnum(TicketsStatus)
  status!: TicketsStatus;
  @IsOptional()
  @IsEnum(TicketsPriority)
  priority!: TicketsPriority;
  @IsOptional()
  @IsString()
  assignedTo!: string;
  @IsOptional()
  attachments!: Record<string, unknown> | unknown[] | null;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  slaDeadline!: Date;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  firstResponseAt!: Date;
  @IsOptional()
  @IsInt()
  @Min(0)
  resolutionTime!: number;
  @IsOptional()
  messages!: Record<string, unknown> | unknown[] | null;
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  lastUpdated!: Date;
}